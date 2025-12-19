# **App Name**: BookBuddy

## Core Features:

- User Authentication: Implement secure user login and signup using Firebase Authentication (email and password). The login/signup page must be the entry point of the application. Only authenticated users can access the rest of the app.
- Movie Listing and Filtering: Display top movies on the Home page with filtering options based on language and genre. Movie cards must be interactive, enlarging smoothly on hover with a zoom animation and shadow or glow effect.
- Movie Details Display: When a user clicks a movie card, navigate to a Movie Details page that displays the movie poster, description, language, genre, duration, and rating. Include a clearly visible “Book Tickets” button.
- Theatre and Show Selection: On clicking “Book Tickets,” allow users to select a location/city, fetch available theatres in that location, and display show timings. When a theatre is selected, display its details and available seats. Implement real-time seat locking to prevent double booking and automatically release locked seats if payment is not completed.
- Seat Selection and Booking: Provide a visual seat layout clearly distinguishing available, booked, and selected seats. Selected seats must be highlighted. The system must prevent double booking using real-time updates.
- Booking Confirmation: After successful payment, display a Booking Confirmation page showing booking ID, movie name, theatre name, show time, selected seats, and total amount. Save the booking to the user’s booking history.
- Profile Management: Implement a fully functional Profile page where users can view their personal details, past bookings, booking details, and log out.

## Style Guidelines:

- Primary color: marine blue #27AEB9 for a cinematic feel
- Background color: Near-black #1E1E1E for immersive UI
- Accent color: Electric purple #BF5FFF for highlights and actions
- Font: “Space Grotesk” sans-serif for body and headings
- Use sharp, modern icons related to movies and theatres
- Implement a dark cinematic theme with clear visual hierarchy
- Use smooth animations and transitions such as hover zoom effects and loading animations