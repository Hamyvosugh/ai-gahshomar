// app/api/jason-form/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface CalendarEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  isHoliday: boolean;
  country: string[];
  blogUrl?: string;
}

export async function POST(request: Request) {
  try {
    const newEvent: CalendarEvent = await request.json();
    
    // Validate the event data
    if (!newEvent.title || !newEvent.date || !newEvent.country || newEvent.country.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Try different possible paths to find the calendarData.ts file
    const possiblePaths = [
      path.join(process.cwd(), 'utils', 'calendarData.ts'),
      path.join(process.cwd(), 'gahshomar', 'utils', 'calendarData.ts'),
      path.join(process.cwd(), 'src', 'utils', 'calendarData.ts'),
      path.join(process.cwd(), 'app', 'utils', 'calendarData.ts'),
    ];

    let filePath = '';
    let fileContent = '';

    // Find the correct path
    for (const tryPath of possiblePaths) {
      try {
        await fs.access(tryPath);
        filePath = tryPath;
        fileContent = await fs.readFile(filePath, 'utf-8');
        console.log('Found calendarData.ts at:', filePath);
        break;
      } catch (err) {
        continue;
      }
    }

    if (!filePath) {
      console.error('Tried paths:', possiblePaths);
      throw new Error('Could not find calendarData.ts file');
    }
    
    // Determine which arrays to update based on countries
    for (const country of newEvent.country) {
      let arrayName = '';
      switch (country) {
        case 'iran':
          arrayName = 'iranEvents';
          break;
        case 'usa':
          arrayName = 'usaEvents';
          break;
        case 'germany':
          arrayName = 'germanyEvents';
          break;
        case 'uae':
          arrayName = 'uaeEvents';
          break;
        default:
          continue;
      }
      
      // Find the array in the file
      const arrayRegex = new RegExp(`(const ${arrayName}: CalendarEvent\\[\\] = \\[)([\\s\\S]*?)(\\];)`, 'm');
      const match = fileContent.match(arrayRegex);
      
      if (match) {
        const [fullMatch, arrayStart, currentEvents, arrayEnd] = match;
        
        // Format the new event
        const formattedEvent = `  ${JSON.stringify(newEvent, null, 2).replace(/\n/g, '\n  ')}`;
        
        // Create the updated array content
        let updatedArrayContent;
        
        // Check if the array is empty
        if (currentEvents.trim() === '') {
          updatedArrayContent = `${arrayStart}\n${formattedEvent}\n${arrayEnd}`;
        } else {
          // Add comma after the last event
          updatedArrayContent = `${arrayStart}${currentEvents.replace(/,?\s*$/, '')},\n${formattedEvent}\n${arrayEnd}`;
        }
        
        // Replace the array in the file content
        fileContent = fileContent.replace(fullMatch, updatedArrayContent);
      }
    }
    
    // Write the updated content back to the file
    await fs.writeFile(filePath, fileContent, 'utf-8');
    
    return NextResponse.json({ success: true, event: newEvent });
    
  } catch (error) {
    console.error('Error updating calendar events:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to update calendar events' },
      { status: 500 }
    );
  }
}