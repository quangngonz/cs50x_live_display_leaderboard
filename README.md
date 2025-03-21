# ISPH Mini CS50x Leaderboard

A real-time leaderboard for the ISPH Mini CS50x Puzzle Day, built with React, Material-UI, and Supabase. This project displays team rankings and recent submissions, updating dynamically as new data is received.  An admin panel is also included to manage hints.

## Features

- **Real-Time Updates**: Leaderboard and recent submissions update in real-time using Supabase's PostgreSQL changes.
- **Responsive Design**: Built with Material-UI for a clean and responsive interface.
- **Dynamic Animations**: Smooth animations for leaderboard updates using `react-flip-toolkit`.
- **Admin Panel**: Password-protected admin interface to add hints for teams.

## Technologies

- **Frontend**: React, Material-UI, Vite
- **State Management**: React Query
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## Setup

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/quangngonz/cs50x_live_display_leaderboard.git  
    cd cs50x-live-display-leaderboard
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Set up environment variables**:

    Create a `.env` file in the root directory.  You'll need your Supabase URL and API key.  These are essential for the application to connect to your Supabase database.

    ```env
    VITE_SUPABASE_URL=your-supabase-url
    VITE_SUPABASE_KEY=your-supabase-key
    ```

    **Important**: Make sure your Supabase database has the necessary tables (`teams`, `submissions`, `questions`, `hints_given`, etc.) and that the Supabase key has the appropriate permissions.

4.  **Run the development server**:

    ```bash
    npm run dev
    ```

    This will start the development server, usually at `http://localhost:5173/`.

5.  **Build for production**:

    ```bash
    npm run build
    ```

    This creates an optimized build in the `dist` directory.

## Project Structure

-   **`src/components/`**: Reusable UI components.
   -   `AddHintForm/`: Contains the `AddHintForm.jsx` component for the admin panel.
   -   `Header/`:  Contains the `Header.jsx` component for the Leaderboard.
   -   `Leaderboard/`: Contains the `Leaderboard.jsx` component to display the ranking list.
   -   `RecentSubmissions/`:  Contains the `RecentSubmissions.jsx` component.
   -   `TeamCard/`:  Contains the `TeamCard.jsx` component to display individual team information.
   -   `Title/`: Contains the `Title.jsx` component for page titles.
-   **`src/hooks/`**: Custom React hooks for data fetching and real-time updates.
   -   `useFetchQuestions.js`: Fetches the list of questions for the hint form.
   -   `useRecentSubmission.js`:  Fetches and updates the recent submissions in real-time.
   -   `useTeamRankings.js`:  Fetches and updates the team rankings in real-time.
-   **`src/pages/`**: Contains page-level components.
   -   `Admin/`: Contains the `AdminPage.jsx` component for the admin dashboard.
   -   `AdminLogin/`: Contains the `AdminLogin.jsx` component for the admin login page.
   -   `Leaderboard/`: Contains the `LeaderboardPage.jsx` component.
-   **`src/services/`**: Contains the Supabase client setup (`supabaseClient.js`).
-   **`src/App.jsx`**:  Main application component defining the routing.
-   **`src/main.jsx`**: Entry point, initializes React Query and renders the `App` component.
-   **`eslint.config.js`**:  ESLint configuration for linting JavaScript and JSX files.
-   **`vite.config.js`**: Vite configuration file.
-   **`vercel.json`**: Vercel configuration file for deployment.

## Deployment

Deployed on Vercel. The `vercel.json` file ensures all routes are redirected to the root for SPA compatibility.

## Admin Access

The admin panel is located at `/admin`. The default password is `isphcs50x`.  **It is highly recommended to change this password** in the `src/pages/AdminLogin/AdminLogin.jsx` file before deploying to production.

## Supabase Setup

Ensure your Supabase database is correctly set up with the following:

*   **Tables**:  `teams`, `submissions`, `questions`, `hints_given`.  (The exact schema depends on your backend API).
*   **Row Level Security (RLS)**: Configure RLS policies to protect your data, especially the `submissions` and `hints_given` tables.
*   **API Keys**: Use a service role key only in server-side functions or environments you trust.  Use the `anon` key for the client-side.

## Customization

*   **Styling**:  Most components use Material-UI for styling.  You can customize the theme in `src/App.jsx` or by overriding Material-UI styles in your components.  App.css holds the global styles.
*   **API Endpoint**:  The API endpoints are hardcoded inside of `src/hooks` and `src/components/AddHintForm` (for `AddHintForm.jsx`) and they point to `https://isph-mini-cs50x-api.vercel.app/`.  If you are hosting your own API server, remember to change the endpoints to your server.
*   **Components**:  Feel free to modify or create new components in the `src/components/` directory.
*   **Routes**: Modify the routes to add additional pages on `src/App.jsx`.

## License

This project is open-source and available under the MIT License.
