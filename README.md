### Deploy Node.js

***

##### Prerequisite
+ Platform: Ubuntu 16.04 64bit<p>
+ Software: wget tar xz-utils<p>
+ Nodejs Version: 6.2.0<p>

##### Use Source Code<p>
  + Download nodejs v6.2.0 source code<p>
  `wget https://nodejs.org/dist/v6.2.0/node-v6.2.0.tar.gz`<p>

  + Untar<p>
  `tar -zxvf node-v6.2.0.tar.gz -C ./`<p>

  + Enter the folder<p>
  `cd node-v6.2.0/`<p>

  + make & install Node.js to your system<p>
  ```
        ./configure
        make
        (sudo) make install
  ```
  
##### Use Linux Binaries
  + Create a new folder<p>
  `mkdir /home/node`<p>

  + Enter into the folder<p>
  `cd /home/node`<p>

  + Download 64 bit nodejs v6.2.0 linux binaries<p>
  `wget https://nodejs.org/dist/v6.2.0/node-v6.2.0-linux-x64.tar.xz`<p>

  + Untar<p>
  `tar -Jxvf node-v6.2.0.tar.gz`<p>

  + Move all files into system path<p>
  `\mv -r /home/node/node-v6.2.0/* /`<p>
  `PS: Copy method is not work here.`<p>
