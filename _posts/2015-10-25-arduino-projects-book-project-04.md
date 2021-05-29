---
title: 'Arduino Projects Book - Project 04: Color Mixing Lamp'
date: '2015-09-30 23:17:24'
categories:
  - Arduino
tags:
  - arduino_uno
excerpt: >-
  blinking LEDs can be fun, but what about fading them, or mixing colors? You might expect that it's just a matter of providing less voltage to an LED to get it to fade.
---

  In this project, we will use a tri-color LED and three Phototransistors. You'll create a lamp that smoothly changes colors depending on external lighting conditions.


## **Introduction:**
* PWM(Pulse Width Modulation): 
  * Motivation: Difital signals have two position: on and off, or in shorthand 1 or 0. On the other hand, analog signal can be on, off, half-way, two-thirds, or any position between 0 and 1. The two are handled very differently in electronics, but we often need to work them together. Often, engineers will translate the analog input into difital input via analog-to-digital converter for MCU(microncontroller), but what about outpust? That's why we introduce you the PWM.
    * ![arduino-uno](/images/arduino-projects-book-project-04/PWM_signal.gif)
  * Idea: The purpos of PWM is provide a way to control analog devices with a digital output, such that PWM rapidly turns the output pin on and off with a certain frequency and a certain pulse-width(like wave period). And then you can use it for things like variable-speed motors, dimmable lights, actuatrs, and speakers. For example, you can apply full voltage to a motor, and the motor will pulse for a certain intervals, like the voltage being applied and remove many times. However, its motor won't stop instantly due to inertia, and so by the time you re-apply power it has only slowed a bit.Therefore, you do not experience an abrupt stop in power if a motor is driven by PWM.



## **Lab Setup:**

- 1 x Arduino UNO

![arduino-uno](/images/arduino-projects-book-project-03/arduino_uno.jpg)

- 1 x Breadboard
- 8 x Jumper wires
- 3 x 220-ohm resistors
- 1 x Temperature sensor
- 3 x LEDs

---
## **DESIGN THE CIRCUIT:**

Schematic view:

![schematic](/images/arduino-projects-book-project-03/schematic.png)

Circuit diagrame from [Fritzing](http://fritzing.org/home/):

![breadboard-layout](/images/arduino-projects-book-project-03/breadboard-layout.jpg)

The actually setup:

![build](/images/arduino-projects-book-project-03/build.jpg)

---
## **THE CODE:**

<p align="center"><font face="consolas"><b>Serial.begin(baud_rate);</b></font></p>

This function opens a connection between the Arduino and the computer with a defined speed, `baud_rate`, e.g. Serial.begin(9600) says the Arduino and your PC's will communite in 9600 bits per second. (Verify this in the IDE's serial monitor)

<p align="center"><font face="consolas"><b>analogRead(pin);</b></font></p>

Similarly to `digitalRead(pin)`, `analogRead(pin)` will get the value from the particular pin number (from A0 to A5), and it indicates the voltage of that pin, which varies between 0 and 1023.

<p align="center"><font face="consolas"><b>Serial.print(variable);</b></font></p>

It sends the information from Arduino to your PC, which can be view from the serial monitor.(Serial monitor locate at upper right conner of IDE, or use shortcut `Ctrl + Shift + M`)

Here are the formulas that I used for this lab, which describe the relationship between the sensor and the voltage:

<p align="center"><font face="consolas"><b>float voltage = (sensorValue / 1024.0) * 5.0;</b></font></p>

Voltage is assigned a real value between 0V and 5V. Since the sensor will read a value between 0 and 1024, we need to divide it by 1024 to get the ratio (or how much of 1024 the sensor reads in) and then multiply by 5 to get how much of 5V the voltage is going to have.

<p align="center"><font face="consolas"><b>temperature = (voltage - 0.5) * 100.0;</b></font></p>

For this TMP36 temperature sensor, every 10mV equals 1 degree Celsius.

Here is the code that I used(I modified from original code to have 5 LED. Each degree increase in your skin temperature, one more LED will be turn on. It has more precise indication to measure your skin temerature, which usually range from 32–35 °C, https://hypertextbook.com/facts/2001/AbantyFarzana.shtml)

{% highlight c linenos %}
/**
 * Project Name: Arduino Projects Book - Project 03: Love-O-Meter
 *
 * File Name: Project3_Love-o-Meter.ino
 * Description: 
 * Author: Zhengqi Dong
 * Created:
 * Updated:
 */

const int sensorPin = A0;
const float baselineTemp = 32.0;

void setup() {
  Serial.begin(9600);
  int pinNumber;
  for(pinNumber = 2; pinNumber < 7; pinNumber++){
    pinMode(pinNumber, OUTPUT);
    digitalWrite(pinNumber, LOW);
  }
}

void loop() {
  // put your main code here, to run repeatedly:
  int sensorVal = analogRead(sensorPin);
  Serial.print("Sensor Value: ");
  Serial.print(sensorVal);

  // convert the ADC reading to voltage
  float voltage = (sensorVal/1024.0) * 5.0;
  Serial.print(", Volts: ");
  Serial.print(voltage);

  //convert the voltage to temperature in degrees
  Serial.print(", degress C: ");
  float temperature = (voltage - 0.5) * 100;
  Serial.println(temperature);

  //Control how the LED will change with different temperature
  if(temperature < baselineTemp){
    digitalWrite(2, LOW);
    digitalWrite(3, LOW);
    digitalWrite(4, LOW);
    digitalWrite(5, LOW);
    digitalWrite(6, LOW);    
  }else if(temperature >= baselineTemp+1 && temperature <= baselineTemp+2){
    digitalWrite(2, HIGH);
    digitalWrite(3, LOW);
    digitalWrite(4, LOW);
    digitalWrite(5, LOW);
    digitalWrite(6, LOW);    
  }else if(temperature >= baselineTemp+2 && temperature <= baselineTemp+3){
    digitalWrite(2, HIGH);
    digitalWrite(3, HIGH);
    digitalWrite(4, LOW);
    digitalWrite(5, LOW);
    digitalWrite(6, LOW);    
  }else if(temperature >= baselineTemp+3 && temperature <= baselineTemp+4){
    digitalWrite(2, HIGH);
    digitalWrite(3, HIGH);
    digitalWrite(4, HIGH);
    digitalWrite(5, LOW);
    digitalWrite(6, LOW); 
  }else if(temperature >= baselineTemp+4 && temperature <= baselineTemp+5){
    digitalWrite(2, HIGH);
    digitalWrite(3, HIGH);
    digitalWrite(4, HIGH);
    digitalWrite(5, HIGH);
    digitalWrite(6, LOW); 
  }else if(temperature >= baselineTemp+5 && temperature <= baselineTemp+6){
    digitalWrite(2, HIGH);
    digitalWrite(3, HIGH);
    digitalWrite(4, HIGH);
    digitalWrite(5, HIGH);
    digitalWrite(6, HIGH); 
  }
}
{% endhighlight %}

## **Video Explanation:**

Here is more detailed explanation of those electronic componenet that I used in this lab:
<iframe width="1280" height="720" src="https://www.youtube.com/embed/tjamdT8UPZY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## **Reference:**
- Fitzgerald, S., & Shiloh, M. _Arduino Projects Book_. Arduino AG, 2017
- Heath, Janet. "PWM: Pulse Width Modulation: What is it and how does it work?" _Analog IC Tips_, Apr 04. 2017, <https://www.analogictips.com/pulse-width-modulation-pwm/>
