# GamePlatformer_IntroductionToProgramming_2023_UoL

This repository contains "Shadow Walker" (working title), a 2D platformer game developed using the p5.js library. This project was created as part of an "Introduction to Programming" module, undertaken during my initial months (around the 5th month) of studying Computer Science at the University of London, with very little prior coding experience. This project is coded along side my "The Gamer's Unite" website.

The game challenges players to navigate a character through a landscape filled with obstacles, collectables, and enemies, demonstrating fundamental game development concepts learned during the introductory course.
Project Overview & Learning Context:

As an early programming project, "Shadow Walker" was a significant learning experience in applying basic JavaScript concepts to create an interactive application. The development focused on understanding game loops, character movement, collision detection, object management, and simple sprite animation. Key learning points included managing game states, handling user input, creating and drawing game elements, and implementing basic game mechanics like scoring and lives.

![image](https://github.com/user-attachments/assets/f955df67-8a30-4abe-9b16-7776bd3fbd39)

[A screenshot of the game]

- Gameplay & Features:

    Core Mechanics (sketch.js, check.js):

        Player Character: A simple character controlled by the player.

        Movement: Left/Right arrow keys for horizontal movement. Up arrow key for jumping (hold for higher jump).

        Scrolling Camera: The game view scrolls to follow the player character.

        Lives System: The player starts with a set number of lives (hearts), losing one upon falling into a canyon or touching an enemy.

        Game Over / Level Complete: The game ends if lives run out, or a "Level Complete" state is reached.

    Game Elements & Environment (draw.js, platforms.js, enemies.js):

        Collectables: "Among Us" themed collectables scattered throughout the level. Collecting them increases the game score.

        Canyons: Obstacles that the player must jump over. Falling into a canyon results in losing a life and respawning.

        Enemies ("Shadows"): Basic enemies patrol set paths. Contact with an enemy results in losing a life.

            Exorcism Mechanic: After collecting a certain number of items, the player gains the ability to "exorcise" (defeat) enemies by holding a "cross" (activated by Spacebar) near them for a short duration.

        Moving Platforms: Platforms that move horizontally, requiring timed jumps.

        Flagpole: The end-of-level goal. Reaching it triggers a "Level Complete" state.

        Scenery: Includes procedurally drawn trees, mountains (with snowcaps), and moving clouds to create a simple game world. A moon is also present in the sky.

    Player Character Animation (draw.js):

        Simple sprite changes based on player state (idle, moving left/right, falling).

    Objectives & UI (draw.js):

        Initial Objective Text: Guides the player at the start of the game.

        Updated Objective: Appears after collecting some items, introducing the enemy exorcism mechanic.

        Score Display: Shows the number of collectables found.

        Lives Display: Shows remaining hearts.

        "Whispering Voices" Particle Effect (platforms.js): After collecting all items, text particles (thoughts/voices) emanate, adding a narrative element.

    Sound Effects (sketch.js - preload):

        Includes sounds for jumping, collecting items, falling, level completion, ambient background noise, and walking. (All sounds sourced from Zapsplat.com)

- Code Structure:

The game logic is organized into several JavaScript files:

    sketch.js: Main game loop, setup, core game logic, player input.

    draw.js: Functions for drawing all visual elements (character, environment, UI).

    check.js: Functions for collision detection and game state checks (collectables, canyons, flagpole).

    platforms.js: Logic for creating and managing moving platforms and the "voices" particle effect.

    enemies.js: Constructor and methods for enemy behavior and the exorcism mechanic.

    index.html: Basic HTML structure to host the p5.js canvas and provide game instructions.

- Technologies Used:

    JavaScript (p5.js library for 2D graphics, interaction, and sound)

    HTML5
