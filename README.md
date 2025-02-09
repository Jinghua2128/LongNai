# LongNai - Interactive English Learning for Kids

**LongNai** is an engaging educational platform designed to help primary and secondary school students learn English through gamified storytelling and adaptive quizzes. The app personalizes the learning journey by allowing students to select difficulty levels, track progress, and interact with 3D-animated stories. With a focus on accessibility and fun, LongNai transforms language learning into an adventure.

**[View GitHub Repository](https://github.com/Jinghua2128/LongNai)**

---

## Design Process

### Target Audience
- **Primary Users:** Kids aged 6–15 (Primary 1 to Secondary 4).
- **Secondary Users:** Parents/teachers managing accounts and monitoring progress.

### User Stories
1. **As a first-time user**, I want to sign up easily, so I can start learning.
2. **As a returning user**, I want to log in securely, so I can resume my progress.
3. **As a student**, I want to select my grade/difficulty level, so lessons match my skills.
4. **As a student**, I need a tutorial on first login, so I understand how to navigate the app.
5. **As a parent**, I want to reset my child’s password, so they can regain account access.
6. **As a user**, I want to customize my profile picture and username, so I can personalize my experience.
7. **As a learner**, I want to choose story-based games with quizzes, so I can practice English interactively.
8. **As a student**, I want to see 3D characters during stories, so learning feels immersive.

### Wireframes & Mockups
- **Adobe XD Wireframe:** [Link to XD Share URL](#) *(Include link or attach PDF)*
- **Key Screens:** Login, Profile Setup, Story Selection, Quiz Interface.

---

## Features

### Existing Features
1. **User Authentication**  
   - Secure login, signup, and password reset flow for parents/students.
2. **Profile Customization**  
   - Upload profile pictures, set usernames, and select grades (Primary 1–Secondary 4).
3. **Interactive Tutorial**  
   - Guided walkthrough for first-time users to learn app navigation.
4. **Story Selection**  
   - Two story boxes per difficulty level, each with sequential chapters.
5. **3D Storytelling**  
   - Animated 3D characters accompany story sessions for immersive learning.
6. **Adaptive Quizzes**  
   - In-story quizzes adjust difficulty based on grade selection.
7. **Progress Tracking**  
   - Save quiz scores and story completion status per user.

### Features Left to Implement
- **Voice Recognition:** Practice pronunciation with real-time feedback.
- **Parent Dashboard:** Track child’s progress and adjust difficulty.
- **Multiplayer Mode:** Collaborative quizzes with friends.
- **Achievement Badges:** Reward system for completing challenges.

### Assistive AI
- **Firebase Setup:** ChatGPT assisted with structuring NoSQL database rules for user data.  
  ![Firebase Code Snippet](screenshots/firebase-ai.png)
## Testing

### Manual Testing Scenarios
1. **Login Page**  
   - Submit empty form → Error: "Please enter your email and password."  
   - Enter invalid email → Error: "Invalid email format."  
   - Valid credentials → Redirect to profile setup/homepage.

2. **Profile Setup**  
   - Upload non-image file → Error: "Please upload a JPEG/PNG."  
   - Leave grade unselected → Error: "Select your grade to continue."

3. **Story Selection**  
   - Complete a story chapter → Next chapter unlocks.  
   - Fail a quiz → Option to retry with simplified questions.

4. **Responsiveness**  
   - Test on mobile, tablet, and desktop → UI scales correctly.  
   - 3D models load without lag on modern browsers (Chrome, Safari).

### Known Issues
- 3D animations may lag on low-end devices.
- Password reset email occasionally delayed (Firebase throttling).

## Credits
https://uiverse.io/
https://lottie.host/embed/1b875b86-77d8-460d-9369-a02361f97faf/jP5M4ZDR1y.lottie

### Media
- Icons by [FontAwesome](https://fontawesome.com/).

### Acknowledgements
- Inspired by **Duolingo** and **ABCmouse** for gamified learning mechanics.
