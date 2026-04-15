const EVENTS_DATA = [
    {
      id: 1,
      name: 'React Workshop',
      date: '2026-04-15',
      time: '10:00 AM - 4:00 PM',
      location: 'Room 101, Tech Campus',
      category: 'Workshop',
      totalSlots: 40,
      slotsBooked: 24,
      description:
        'Learn React fundamentals including components, hooks, and routing. Build a project from scratch in this full-day hands-on workshop.',
      image:
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=350&fit=crop',
      attendees: [
        { firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', phone: '5551234567' },
        { firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', phone: '5552345678' },
        { firstName: 'Charlie', lastName: 'Brown', email: 'charlie@example.com', phone: '5553456789' },
        { firstName: 'Diana', lastName: 'Miller', email: 'diana@example.com', phone: '5554567890' },
        { firstName: 'Eve', lastName: 'Davis', email: 'eve@example.com', phone: '5555678901' }
      ],
    },
    {
      id: 2,
      name: 'Team Building Picnic',
      date: '2026-05-01',
      time: '12:00 PM - 5:00 PM',
      location: 'Central Park, Pavilion B',
      category: 'Social',
      totalSlots: 60,
      slotsBooked: 45,
      description:
        'Outdoor team activities, relay races, trivia, volleyball, and a catered lunch with vegetarian options. A great way to bond with colleagues.',
      image:
        'https://images.unsplash.com/photo-1529543544282-ea99407407c1?w=600&h=350&fit=crop',
      attendees: [
        { firstName: 'Frank', lastName: 'Wilson', email: 'frank@example.com', phone: '5556789012' },
        { firstName: 'Grace', lastName: 'Taylor', email: 'grace@example.com', phone: '5557890123' },
        { firstName: 'Heidi', lastName: 'Anderson', email: 'heidi@example.com', phone: '5558901234' }
      ],
    },
    {
      id: 3,
      name: 'Design Sprint',
      date: '2025-03-10',
      time: '9:00 AM - 3:00 PM',
      location: 'Studio B, Innovation Hub',
      category: 'Workshop',
      totalSlots: 20,
      slotsBooked: 12,
      description:
        'A one-day design sprint: map a challenge, sketch solutions, prototype, and test with real users. Open to designers, developers, and PMs.',
      image:
        'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&h=350&fit=crop',
      attendees: [
        { firstName: 'Ivan', lastName: 'Martinez', email: 'ivan@example.com', phone: '5559012345' },
        { firstName: 'Judy', lastName: 'Thomas', email: 'judy@example.com', phone: '5550123456' }
      ],
    },
    {
      id: 4,
      name: 'Hackathon 2026',
      date: '2026-06-20',
      time: '8:00 AM - 8:00 AM (next day)',
      location: 'Main Hall, Convention Center',
      category: 'Competition',
      totalSlots: 120,
      slotsBooked: 80,
      description:
        '24-hour coding challenge! Build innovative solutions around "Tech for Good." Top 3 teams win cash prizes and interview fast-tracks.',
      image:
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=350&fit=crop',
      attendees: [
        { firstName: 'Karl', lastName: 'Garcia', email: 'karl@example.com', phone: '5551234567' },
        { firstName: 'Liam', lastName: 'Hernandez', email: 'liam@example.com', phone: '5552345678' },
        { firstName: 'Mallory', lastName: 'Lopez', email: 'mallory@example.com', phone: '5553456789' },
        { firstName: 'Nancy', lastName: 'Gonzalez', email: 'nancy@example.com', phone: '5554567890' },
        { firstName: 'Oscar', lastName: 'Wilson', email: 'oscar@example.com', phone: '5555678901' },
        { firstName: 'Peggy', lastName: 'Clark', email: 'peggy@example.com', phone: '5556789012' }
      ],
    },
    {
      id: 5,
      name: 'Onboarding Mixer',
      date: '2025-02-28',
      time: '5:00 PM - 7:30 PM',
      location: 'Rooftop Lounge, HQ Building',
      category: 'Social',
      totalSlots: 40,
      slotsBooked: 30,
      description:
        'A casual evening mixer for new team members. Meet leadership, learn about company culture, and connect with peers over appetizers.',
      image:
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=350&fit=crop',
      attendees: [
        { firstName: 'Quinn', lastName: 'Lewis', email: 'quinn@example.com', phone: '5557890123' },
        { firstName: 'Ruth', lastName: 'Walker', email: 'ruth@example.com', phone: '5558901234' },
        { firstName: 'Steve', lastName: 'Hall', email: 'steve@example.com', phone: '5559012345' }
      ],
    },
  ]
  
  export default EVENTS_DATA
  