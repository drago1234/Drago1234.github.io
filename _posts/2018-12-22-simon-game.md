---
title: 'The Simon Game: Applying Electrical Engineering to recreate a beloved arcade game'
date: '2018-12-22  22:40:59'
categories:
  - Electronic
tags:
  - circuit design
  - flip flop
  - VHDL programming
  - FPGA board
  - Quartus Prime

excerpt: >-
  This game was created over throughout the semester of 7 lab into one functioning state machine. It was created in Quartus Prime and programmed onto an FPGA board. The functionality was created through Block Diagrams and VHDL code. 
---

## The Simon Game

### Executive Summary: 

The Simon have totally five state: 1) Wait state, the LEDs sequence in a circular pattern; 2)Auto-display state: display the current LEDs sequence; 3)Game state: read the pressed button and check whether input match the displayed sequence; 4)Win state: display the “win” sounds and and “win” sequence; 5)Lost: display the “lose” sounds and and “lose” sequence. During the design process, the Random counter and TEST Controller was modified and the VHDL code was modified for controlling the state of each feature of Simon Game

![simon_game](\assets\images\ece_simon_game\simon.gif)

### Lab Supplies

* DE2 Board
* USB Blaster Cable
* Simon Game Box 
* Speaker



### Introduction

 The Simon Game is a memory game that requires a user to enter an increasingly long sequence of button presses. Eventually, the sequence becomes so long that it is difficult to remember.  We modified the Random Number Generator from previous lab and replaced the Sound Decoder with the TEST-Controller and used lines to connect them together. After that, we used the System Controller VHDL file to replace the TEST-Controller, and  modified the codes in the VHDL file to run on the DE2 board.



### Methodologies

![simon_game](\assets\images\ece_simon_game\circuit01.png)

*This is the CODEC circuit. All sub-circuits sit in this overall design. This is the final circuit that gets compiled and uploaded to the FPGA board.*

![simon_game](\assets\images\ece_simon_game\circuit02.png)

*This is the circuit that produces the stream of data that goes to the speaker. The Audio converter was given from the lab instructor, and the below circuit interfaces with it to pass the correct frequency sound.*



![simon_game](\assets\images\ece_simon_game\circuit03.png)

*This is the audio controller. This is what controls the Audio that plays when a button is pressed. When a state is changed, a multiplexer selected which P-Value is inserted into the ROM memory, which then translates to a sine wave of the appropriate frequency, and is output to the speaker.*





![simon_game](\assets\images\ece_simon_game\circuit04.png)

*This circuit generates a random number between 0 and 999. It is used to randomly choose a sequence for the user to follow. It is based upon counters and flip flops.*



![simon_game](\assets\images\ece_simon_game\circuit05.png)

*This is the button denouncer circuit. It ensures each button press counts as a singular press, even if the user holds the button down for an extended period of time. It takes in the button press, and saves the state in a flip flop, then passes that state only on the rising clock edge. Another state cannot enter the flip flop unless the state of the button changes (the button is released).*



![simon_game](\assets\images\ece_simon_game\circuit06.png)

Here is a small example of the VHDL code that was written for the system controller. The system controller was written completely in VDHL and it controlled the various states of the game. Here is the Auto-wait state, which flashes the lights before the user activates the first game. There is also a state for losing, winning, waiting for input, and changing sequence.

### Conclusion

This circuit design project is a very good study material. Throughout the entire semester, it helps us(students) combined the knowledge that we learn from lecture in to real-world application, and give student certain amount experience in designing things like, Latches, Flip-Flops, Random number generator, Counters, Audio Synthesizer, and more. 

### Reference:

Reference “Lab 7 – The Simon State Machine, Part 2”, ECE 2060 Lab,Department of Electrical & Computer Engineering


