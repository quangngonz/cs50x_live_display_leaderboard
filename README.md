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
- **Animations**: Framer Motion

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

    **Important**:

    *   Make sure your Supabase database has the necessary tables (`teams`, `submissions`, `questions`, `hints_given`, etc.) and that the Supabase key has the appropriate permissions. See the "Supabase Setup" section below for more details.
    *   **Do NOT commit the `.env` file** to your repository.

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
    -   `AddHintForm/`: Contains the `AddHintForm.jsx` component for the admin panel to add hints to teams.
    -   `Header/`:  Contains the `Header.jsx` component for the Leaderboard table header.
    -   `Leaderboard/`: Contains the `Leaderboard.jsx` component to display the ranking list.
    -   `RecentSubmissions/`:  Contains the `RecentSubmissions.jsx` component to display recent submissions.
    -   `TeamCard/`:  Contains the `TeamCard.jsx` component to display individual team information.
    -   `Title/`: Contains the `Title.jsx` component for page titles and the main heading.
    -   `Counter/`: Contains the `Counter.jsx` component for displaying the score with animation.
    -   `DecryptedText/`: Contains the `DecryptedText.jsx` component for text scrambling animation.
-   **`src/hooks/`**: Custom React hooks for data fetching and real-time updates.
    -   `useFetchQuestions.js`: Fetches the list of questions for the hint form.
    -   `useRecentSubmission.js`:  Fetches and updates the recent submissions in real-time using Supabase's PostgreSQL changes.
    -   `useTeamRankings.js`:  Fetches and updates the team rankings in real-time. It also invalidates the cache on Supabase data changes using Supabase's PostgreSQL changes.
-   **`src/pages/`**: Contains page-level components.
    -   `Admin/`: Contains the `AdminPage.jsx` component for the admin dashboard.
    -   `AdminLogin/`: Contains the `AdminLogin.jsx` component for the admin login page.
    -   `Leaderboard/`: Contains the `LeaderboardPage.jsx` component to display the main leaderboard.
-   **`src/services/`**: Contains the Supabase client setup (`supabaseClient.js`).
-   **`src/App.jsx`**:  Main application component defining the routing.
-   **`src/main.jsx`**: Entry point, initializes React Query and renders the `App` component.
-   **`eslint.config.js`**:  ESLint configuration for linting JavaScript and JSX files.
-   **`vite.config.js`**: Vite configuration file.
-   **`vercel.json`**: Vercel configuration file for deployment, ensuring all routes are redirected to the root for SPA compatibility.
-   **`src/App.css`**: Global CSS styles for the application.

## Deployment

Deployed on Vercel. The `vercel.json` file ensures all routes are redirected to the root for SPA compatibility.

## Admin Access

The admin panel is located at `/admin`. The default password is `isphcs50x`.  **It is highly recommended to change this password** in the `src/pages/AdminLogin/AdminLogin.jsx` file before deploying to production for security reasons.

## Supabase Setup

Ensure your Supabase database is correctly set up with the following:

*   **Tables**:  `teams`, `submissions`, `questions`, `hints_given`.  (The exact schema depends on your backend API and needs to match the API endpoints used in the `src/hooks` directory.)  The tables should at least contain the fields expected by the API.
*   **Row Level Security (RLS)**: Configure RLS policies to protect your data, especially the `submissions` and `hints_given` tables.  Carefully consider who should have access to create, read, update, and delete rows in these tables.  Incorrect RLS settings can lead to data breaches.
*   **API Keys**:
    *   Use the `anon` key in `src/services/supabaseClient.js` for client-side access.  Ensure RLS policies are properly configured, as the `anon` key grants broad access subject to those policies.
    *   Use a service role key only in server-side functions (like your API) or environments you trust. **Never expose your service role key in client-side code.** The service role key bypasses all RLS policies and grants full administrative access to your database.

## Customization

*   **Styling**:  Most components use Material-UI for styling.  You can customize the theme by modifying the Material-UI `theme` object or overriding Material-UI styles in your components.  `App.css` holds the global styles.
*   **API Endpoints**:  The API endpoints are hardcoded inside of `src/hooks` (e.g., `useFetchQuestions.js`, `useTeamRankings.js`, `useRecentSubmissions.js`) and `src/components/AddHintForm/AddHintForm.jsx` (for `AddHintForm.jsx`) and they point to `https://isph-mini-cs50x-api.vercel.app/`.  If you are hosting your own API server, remember to change these endpoints to your server's URL.
*   **Components**:  Feel free to modify or create new components in the `src/components/` directory.
*   **Routes**: Modify the routes to add additional pages on `src/App.jsx`.
*   **Real-time Subscriptions**: Review the Supabase channel names and table names in `src/hooks/useRecentSubmission.js` and `src/hooks/useTeamRankings.js` to ensure they match your database schema.
*   **Animations**: The scrambling effect of the team names, and leaderboard title are handled by `DecryptedText/DecryptedText.jsx`, and can be further customized.
*   **Scoring**: The number of stars, and overall score are handled in the `Counter/Counter.jsx` file.  The scoring, however, happens on the API side.  Make sure the API has the proper logic for that.

## License

This project is open-source and available under the MIT License.
