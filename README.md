# flower-power
Tessel 1 code for monitoring ambient data. This uses the climate module and a moisture sensor.

The code is specific to my setup but it's short enough to be readable and easily changeable.

## Install

Run `npm i`.

## Description

`climate.js` must be pushed on tessel. It reads data from sensors and sends it to a server on `192.168.5.104:8001` every 10 minutes.

`server.js` is the server which does nothing else but display the date when it received the data along with the data it received. Start the server with `npm start` or better yet with `npm start > data.txt 2>data.txt &` to save the read data to a file.

The climate module is connected on port `D` on tessel to keep it away from a heat source (tessel itself). It would be even better if you'd connect the module via longer cables or a breadboard so they stay fairly away from each other.

The moisture sensor (YL-38 and YL-69) starts powered off. When the time for reading comes, the sensor is powered on for 2 seconds, the data is read then it's powered off again. This is done to prevent corrosion of the sensor due to electrolisis. Even so, inverting the +/- cables on the sensor itself is recommended every week to prolong the life of the sensor further.

To be able to turn the moisture sensor on and off, its VIN pin is connected to a digital pin on the tessel (in the GPIO bank). A digital pin sends either a 0v when turned off or a 3.3v when turned on. 
The analog pin on the sensor is connected to an analog pin on tessel GPIO and used for actually reading the data.

The min and max values coming from the moisture sensor are hardcoded in `climate.js` (https://github.com/terebentina/flower-power/blob/master/climate.js#L7). You can set yours if you read the output by keeping the sensor in air and in water respectively.

The reading from the moisture sensor is converted into a percent value where 0 is totally dry and 100 is totally wet.

Good tessel 1 docs are:

- https://github.com/tessel/hardware/blob/master/tessel-hardware-overview.md#gpio-bank
- https://github.com/tessel/t1-docs/blob/master/hardware-api.md
