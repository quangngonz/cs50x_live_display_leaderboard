# ISPH Mini CS50x Leaderboard

A real-time leaderboard for the ISPH Mini CS50x Puzzle Day, built with React, Material-UI, and Supabase. This project displays team rankings and recent submissions, updating dynamically as new data is received.

## Features

- **Real-Time Updates**: Leaderboard and recent submissions update in real-time using Supabase's PostgreSQL changes.
- **Responsive Design**: Built with Material-UI for a clean and responsive interface.
- **Dynamic Animations**: Smooth animations for leaderboard updates using `react-flip-toolkit`.

## Technologies

- **Frontend**: React, Material-UI, Vite
- **State Management**: React Query
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/cs50x-live-display-leaderboard.git
   cd cs50x-live-display-leaderboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_KEY=your-supabase-key
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

## Project Structure

- **`src/components/`**: Reusable UI components like `Leaderboard`, `TeamCard`, and `Title`.
- **`src/hooks/`**: Custom hooks for fetching and managing data (`useTeamRankings`, `useRecentSubmissions`).
- **`src/services/`**: Supabase client setup.
- **`src/App.jsx`**: Main application component.
- **`src/main.jsx`**: Entry point with React Query provider.

## Deployment

Deployed on Vercel. The `vercel.json` file ensures all routes are redirected to the root for SPA compatibility.

## License

This project is open-source and available under the MIT License.
