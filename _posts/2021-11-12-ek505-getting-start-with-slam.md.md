---
layout: post  # Required
title: 'Getting Start with SLAM' # Required
date: 2021-11-15  # Required
categories: [Getting_Start, SLAM, EK505] # Option
tags: []  # Option
permalink: getting-start-with-slam.html
toc: true# Option
excerpt: >- 	


---



## Table of contents

{: .no_toc .text-delta }

1. TOC
	{: toc }



## Plan:

1. ROS tutorial #1: Introduction, Installing ROS, and running the Turtlebot simulator, https://www.youtube.com/watch?v=9U6GDonGFHw&list=PLJNGprAk4DF5PY0kB866fEZfz6zMLJTF8



# Resources:



## Paper:



## Course Video

- Udemy
  - ROS2 For Beginners (ROS Foxy - 2021), https://www.udemy.com/cart/success/704244436/
  - ROS for Beginners II: Localization, Navigation and SLAM, https://www.udemy.com/course/ros-navigation/learn/lecture/11785182#overview

Books:

![image-20211120024828774](../images/all_in_one/image-20211120024828774.png)



# Implementing ORB-SLAM on Ubuntu 18.04 & ROS Melodic







# Robot Category:

**我定义的类别：**

1. Mobile Robot: 只要是带轮子的，履带也算，反正以轮子作为驱动 ==》 这研究就是 robot motion control, path planning/navigation 这一块，还有就是些是视觉的东西，比如 object detection, object avoidance, object following. 
2. 爬虫类：所有考腿来移动的，用的都是rigit body作为支架，比如robot dog, 模拟人的/动物的腿的，都算
3. Drone：所有带翅膀的，天上飞的
4. Industrial robot: 带机械臂的，不用移动的那种 ==> 这个可以研究的东西就很多了, 但大多都是控制上面的，robot arm manipulation 这些，比如 forward/backward kinematic, 

==》 搞懂上面这4种基本就够了

**别人的定义**

==>大多数人都是按照应用场景来分，但作为研究或者开发人员，我认为还是我那一套合适。

==》 比如 Drone, Entertainment(那种智能娃娃狗, involve Human-Robot Interaction， NLP 之类的research), Disaster Response， Educational (和3D Printing, Lego, Toy project相关，能够快速落地的，快速assemble的robot), Medical robot (da vinci), Underwater, Self-Driving car, Military & Security, Industrial, Humanoids 

==> 具体参考这里， https://robots.ieee.org/learn/types-of-robots/

Consumer: Consumer robots are robots you can buy and use just for fun or to help you with tasks and chores. Examples are the robot dog Aibo, the Roomba vacuum, AI-powered robot assistants, and a growing variety of robotic toys and kits.

Entertainment: These robots are designed to evoke an emotional response and make us laugh or feel surprise or in awe. Among them are robot comedian RoboThespian, Disney’s theme park robots like Navi Shaman, and musically inclined bots like Partner.

Disaster Response: These robots perform dangerous jobs like searching for survivors in the aftermath of an emergency. For example, after an earthquake and tsunami struck Japan in 2011, Packbots were used to inspect damage at the Fukushima Daiichi nuclear power station.

Drones: Also called unmanned aerial vehicles, drones come in different sizes and have different levels of autonomy. Examples include DJI’s popular Phantom series and Parrot’s Anafi, as well as military systems like Global Hawk, used for long-duration surveillance.

Education: This broad category is aimed at the next generation of roboticists, for use at home or in classrooms. It includes hands-on programmable sets from Lego, 3D printers with lesson plans, and even teacher robots like EMYS.

Medical: Medical and health-care robots include systems such as the da Vinci surgical robot and bionic prostheses, as well as robotic exoskeletons. A system that may fit in this category but is not a robot is Watson, the IBM question-answering supercomputer, which has been used in healthcare applications.

Industrial: The traditional industrial robot consists of a manipulator arm designed to perform repetitive tasks. An example is the Unimate, the grandfather of all factory robots. This category includes also systems like Amazon's warehouse robots and collaborative factory robots that can operate alongside human workers.



Humanoids: This is probably the type of robot that most people think of when they think of a robot. Examples of humanoid robots include Honda’s Asimo, which has a mechanical appearance, and also androids like the Geminoid series, which are designed to look like people.

Military & Security: Military robots include ground systems like Endeavor Robotics' PackBot, used in Iraq and Afghanistan to scout for improvised explosive devices, and BigDog, designed to assist troops in carrying heavy gear. Security robots include autonomous mobile systems such as Cobalt.

Self-Driving Cars: Many robots can drive themselves around, and an increasing number of them can now drive *you* around. Early autonomous vehicles include the ones built for DARPA’s autonomous-vehicle competitions and also Google’s pioneering self-driving Toyota Prius, later spun out to form Waymo.

Underwater: The favorite place for these robots is in the water. They consist of deep-sea submersibles like Aquanaut, diving humanoids like Ocean One, and bio-inspired systems like the ACM-R5H snakebot.



Written by Erico Guizzo. Date published: 2018-08-01; Date modified: 2020-05-28

# Overview of SLAM

- CMU Lecture note:
  - Chap8-Kalman-Mapping_howie.ppt, Localization, Mapping, SLAM and The Kalman Filter according to George， https://www.cs.cmu.edu/~motionplanning/lecture/Chap8-Kalman-Mapping_howie.pdf
  - Chap9-Bayesian-Mapping_howie.ppt, Bayesian Approaches to Localization, Mapping, and SLAM, https://www.cs.cmu.edu/~motionplanning/lecture/Chap9-Bayesian-Mapping_howie.pdf
  - lec 24 – Range‐Only SLAM for Robots Operating Cooperatively with Sensor Networks, https://www.cs.cmu.edu/~motionplanning/lecture/lec24.pdf
  - Artificial Intelligence: Final review, https://www.cs.cmu.edu/afs/cs/academic/class/15381-s07/www/slides/final-review.pdf
  - Search based Planning in Dynamic Environments, https://www.cs.cmu.edu/afs/cs/academic/class/15381-s07/www/slides/013007dynplanning.pdf
  - Robotic Motion Planning: RRT’s, https://www.cs.cmu.edu/~motionplanning/lecture/lec20.pdf
  - Robotic Motion Planning: Controls Primer, https://www.cs.cmu.edu/~motionplanning/lecture/lec22.pdf
- Math review
  - Multivariable calculus, https://www.youtube.com/watch?v=J08-L2buigM&list=PLSQl0a2vh4HC5feHa6Rc5c0wbRTx56nF7&index=24
- Standford Courses:
  - Sebastian Thrun Course page, http://robots.stanford.edu/courses.html
  - Stanford University CS 226: Statistical Techniques in Robotics (Prof. Sebastian Thrun)	, http://cs226.stanford.edu/schedule.html

People

- Influent CS people at Boston University: https://research.com/university/computer-science/boston-university
  - Stephen Grossberg,  https://research.com/u/stephen-grossberg
- 

Learning Material(slide, Paper, Blog)

- The GraphSLAM Algorithm Daniel Holman CS 5391: AI Robotics March 12, 2014, https://slideplayer.com/slide/4546909/
- ROBOT MAPPING AND EKF SLAM, https://slideplayer.com/slide/5983202/

What is ORM-SLAM: [paper](http://webdiis.unizar.es/~raulmur/MurMontielTardosTRO15.pdf), github repo, 

- Based on a monocular camera was first proposed in: Raúl Mur-Artal, J. M. M. Montiel and Juan D. Tardós. ORB-SLAM: A Versatile and Accurate Monocular SLAM System. IEEE Transactions on Robotics, vol. 31, no. 5, pp. 1147–1163, 2015. [PDF](http://webdiis.unizar.es/~raulmur/MurMontielTardosTRO15.pdf)
- source code for the ROS package can be found on this [GitHub page](https://github.com/appliedAI-Initiative/orb_slam_2_ros)
  - appliedAI-Initiative/orb_slam_2_ros, https://github.com/appliedAI-Initiative/orb_slam_2_ros
  - raulmur/ORB_SLAM2, https://github.com/raulmur/ORB_SLAM2
  - castiel520/ORB_SLAM2-Semi-Dense, https://github.com/castiel520/ORB_SLAM2-Semi-Dense
- 2D grid mapping and navigation with ORB-SLAM 2- KITTI Dataset, https://www.youtube.com/watch?v=FCd6p25131I
  - My Projects: https://jahaniam.github.io/index.html
  - Abhineet personal page : http://webdocs.cs.ualberta.ca/~vis/asingh1/
  - source code: https://github.com/abhineet123/ORB_SLAM2



Tutorial:

- EKF SLAM on Turtlebot3, https://shangzhouye.tech/featured-projects/ekf_slam/

- ORB-Slam2: Implementation on my Ubuntu 16.04 with ROS Kinect, https://medium.com/@j.zijlmans/orb-slam-2052515bd84c
- 



# ROS

## Intro:

- ROS allows the collaboration and robotic software development on a world-scale.
- ROS also offers powerful debugging tools, data logging & analysis capabilities, and an open-source 3D robotics simulator called Gazebo.
- ROS provides a lot of industry standard packages for robotic system development.





### Terminology:

- Nodes
  - Can pass messages to one another through topics, make service calls to other nodes, provide a service for other nodes, or set or retrieve shared data from a communal database called the parameter server.

- Topics
- Master





### Installation:

ROS1 Noetic Installation in Windows: [1-2 hr]

- Just follow the tutorial here, http://wiki.ros.org/noetic/Installation.
- !! There is a YouTube video for Windows 10 installation, [How to Install ROS Melodic on Windows natively in just 3 Simple Steps || Install ROS without Ubuntu](https://www.youtube.com/watch?v=8QC7-Odeqhc)

ROS Noetic Installation in Ubuntu:

- Follow this tutorial, [ROS Noetic Installation and Path Sourcing](https://www.youtube.com/watch?v=PowY8dV36DY)

ROS2 Foxy on WIndows:

- Installation, http://wiki.ros.org/Installation/Windows
- !!! Video,How to Install ROS Melodic on Windows natively in just 3 Simple Steps || Install ROS,  https://www.youtube.com/watch?v=8QC7-Odeqhc
  - Installation Code snippet, https://github.com/PranshuTople/Installing_ROS
- [TO-DO] Configuration setup, https://docs.ros.org/en/foxy/Tutorials/Configuring-ROS2-Environment.html



```bash
# Run master node
roscore
# Show all urls
rostopic list
# Launch gazebo
roslaunch gazebo_ros empty_world.launch
# Launch rviz
rosrun rviz rviz
```



ROS Melodic Installation in Ubuntu 18.04 (recommended)

- Installation, http://wiki.ros.org/melodic/Installation/Ubuntu
- !!! Video, INSTALLING & GETTING STARTED WITH ROS | How to install ROS & How to setup Catkin Workspace on Ubuntu, https://www.youtube.com/watch?v=GBBQqiGvOSw

```bash
# 1.2 Setup your sources.list
# Setup your computer to accept software from packages.ros.org.
sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'

# 1.3 Set up your keys
sudo apt install curl # if you haven't already installed curl
curl -s https://raw.githubusercontent.com/ros/rosdistro/master/ros.asc | sudo apt-key add -
sudo apt update

# 1.4 Installaltion begin
sudo apt install ros-melodic-desktop-full
# To find available packages, use:
apt search ros-melodic

# 1.5 Environment setup
# It's convenient if the ROS environment variables are automatically added to your bash session every time a new shell is launched:
echo "source /opt/ros/melodic/setup.bash" >> ~/.bashrc
# Or printf "source /opt/ros/melodic/setup.bash" >> ~/.bashrc
source ~/.bashrc

# 1.6 Dependencies for building packages
# Up to now you have installed what you need to run the core ROS packages. To create and manage your own ROS workspaces, there are various tools and requirements that are distributed separately. For example, rosinstall is a frequently used command-line tool that enables you to easily download many source trees for ROS packages with one command.
# To install this tool and other dependencies for building ROS packages, run:
sudo apt install python-catkin-tools python-rosinstall python-rosinstall-generator python-wstool build-essential

# 1.6.1 Initialize rosdep
# Before you can use many ROS tools, you will need to initialize rosdep. rosdep enables you to easily install system dependencies for source you want to compile and is required to run some core components in ROS. If you have not yet installed rosdep, do so as follows.
sudo apt install python-rosdep
# With the following, you can initialize rosdep.
sudo rosdep init
rosdep update
```

Tutorial

```bash
# Allow you to install ros dependency
sudo rosdep init

# update ros package
rosdep update

# 

source ~/.bashrc

# CTRL + H show hidden file
mkdir -p src

```







## Core ROS Tutorials

### Beginner Level





1. Navigating the ROS Filesystem

   This tutorial introduces ROS filesystem concepts, and covers using the roscd, rosls, and [rospack](http://wiki.ros.org/rospack) commandline tools.

2. Creating a ROS Package

   This tutorial covers using [roscreate-pkg](http://wiki.ros.org/roscreate) or [catkin](http://wiki.ros.org/catkin) to create a new package, and [rospack](http://wiki.ros.org/rospack) to list package dependencies.

3. Building a ROS Package

   This tutorial covers the toolchain to build a package.

4. Understanding ROS Nodes

   This tutorial introduces ROS graph concepts and discusses the use of [roscore](http://wiki.ros.org/roscore), [rosnode](http://wiki.ros.org/rosnode), and [rosrun](http://wiki.ros.org/rosrun) commandline tools.

5. Understanding ROS Topics

   This tutorial introduces ROS topics as well as using the [rostopic](http://wiki.ros.org/rostopic) and [rqt_plot](http://wiki.ros.org/rqt_plot) commandline tools.

6. Understanding ROS Services and Parameters

   This tutorial introduces ROS services, and parameters as well as using the [rosservice](http://wiki.ros.org/rosservice) and [rosparam](http://wiki.ros.org/rosparam) commandline tools.

7. Using rqt_console and roslaunch

   This tutorial introduces ROS using [rqt_console](http://wiki.ros.org/rqt_console) and [rqt_logger_level](http://wiki.ros.org/rqt_logger_level) for debugging and [roslaunch](http://wiki.ros.org/roslaunch) for starting many nodes at once. If you use `ROS fuerte` or ealier distros where [rqt](http://wiki.ros.org/rqt) isn't fully available, please see this page with [this page](http://wiki.ros.org/ROS/Tutorials/UsingRxconsoleRoslaunch) that uses old `rx` based tools.

8. Using rosed to edit files in ROS

   This tutorial shows how to use [rosed](http://wiki.ros.org/rosbash) to make editing easier.

9. Creating a ROS msg and srv

   This tutorial covers how to create and build msg and srv files as well as the [rosmsg](http://wiki.ros.org/rosmsg), rossrv and roscp commandline tools.

10. Writing a Simple Publisher and Subscriber (C++)

    This tutorial covers how to write a publisher and subscriber node in C++.

11. Writing a Simple Publisher and Subscriber (Python)

    This tutorial covers how to write a publisher and subscriber node in python.

12. Examining the Simple Publisher and Subscriber

    This tutorial examines running the simple publisher and subscriber.

13. Writing a Simple Service and Client (C++)

    This tutorial covers how to write a service and client node in C++.

14. Writing a Simple Service and Client (Python)

    This tutorial covers how to write a service and client node in python.

15. Examining the Simple Service and Client

    This tutorial examines running the simple service and client.

16. Recording and playing back data

    This tutorial will teach you how to record data from a running ROS system into a .bag file, and then to play back the data to produce similar behavior in a running system

17. Reading messages from a bag file

    Learn two ways to read messages from desired topics in a bag file, including using the `ros_readbagfile` script.

18. Getting started with roswtf

    Basic introduction to the [roswtf](http://wiki.ros.org/roswtf) tool.

19. Navigating the ROS wiki

    This tutorial discusses the layout of the ROS wiki ([wiki.ros.org](http://wiki.ros.org/Documentation)) and talks about how to find what you want to know.

20. Where Next?

    This tutorial discusses options for getting to know more about using ROS on real or simulated robots.





### Intermediate Level



More client API tutorials can be found in the relevant package ([roscpp](http://wiki.ros.org/roscpp/Tutorials), [rospy](http://wiki.ros.org/rospy/Tutorials), [roslisp](http://wiki.ros.org/roslisp/Tutorials))



1. Creating a ROS package by hand.

   This tutorial explains how to manually create a ROS package.

2. Managing System dependencies

   This explains how to use [rosdep](http://wiki.ros.org/rosdep) to install system dependencies.

3. Roslaunch tips for large projects

   This tutorial describes some tips for writing roslaunch files for large projects. The focus is on how to structure launch files so they may be reused as much as possible in different situations. We'll use the 2dnav_pr2 package as a case study.

4. Running ROS across multiple machines

   This tutorial explains how to start a ROS system using two machines. It explains the use of `ROS_MASTER_URI` to configure multiple machines to use a single master.

5. Defining Custom Messages

   This tutorial will show you how to define your own custom message data types using the ROS [Message Description Language](http://wiki.ros.org/ROS/Message_Description_Language).

6. Using a C++ class in Python

   This tutorial illustrates a way to use a C++ class with ROS messages in Python.

7. Packaging your ROS project as a snap

   This tutorial covers how to package and deploy your ROS project as a snap.

8. How to Write a Tutorial

   This tutorial covers useful template and macros for writing tutorials, along with example tutorials that are available for guidance on [ros.org](http://wiki.ros.org/Documentation)



ROS2 Galactic Installation in WIndows:

- If you are a window user, follow this tutorial, [Building ROS 2 on Windows](http://docs.ros.org/en/galactic/Installation/Windows-Development-Setup.html)





This ROS node requires catkin_make_isolated or catkin build to build. This package depends on a number of other ROS packages which ship with the default installation of ROS. If they are not installed use [rosdep](http://wiki.ros.org/rosdep) to install them. In your catkin folder run

```bash
sudo rosdep init
rosdep update
rosdep install --from-paths src --ignore-src -r -y
```



### Fist time testing:

- Checking ros is running:

![image-20211115004920726](../images/all_in_one/image-20211115004920726.png)

- See a list of topics with command: `rostopic list`

![image-20211115005005552](../images/all_in_one/image-20211115005005552.png)

- Running Gazebo with command: `roslaunch gazebo_ros empty_world.launch`

![image-20211115005144676](../images/all_in_one/image-20211115005144676.png)

- Running ruiz with command: `rosrun rviz rviz`

![image-20211115005435300](../images/all_in_one/image-20211115005435300.png)







## Udemy: [ROS for Beginners: Basics, Motion, and OpenCV](https://www.udemy.com/course/ros-essentials/)



### Installation

```bash
 1111  git clone https://github.com/aniskoubaa/ros_essentials_cpp.git
 1112  pip install -U rosdep rosinstall_generator wstool rosinstall six vcstools
 1113  cmake 
 1117  sudo apt-get install python3-opencv
 1118  python -V
 1123  roscd
 1129  sudo ln -s /usr/include/opencv4/opencv2/ /usr/include/opencv
 1130  cd catkin_ws/
 1134  catkin_make
```



Error1:

```bash
-- Using these message generators: gencpp;geneus;genlisp;gennodejs;genpy
CMake Error at /opt/ros/melodic/share/cv_bridge/cmake/cv_bridgeConfig.cmake:113 (message):
  Project 'cv_bridge' specifies '/usr/include/opencv' as an include dir,
  which is not found.  It does neither exist as an absolute directory nor in
  '${{prefix}}//usr/include/opencv'.  Check the issue tracker
  'https://github.com/ros-perception/vision_opencv/issues' and consider
  creating a ticket if the problem has not been reported yet.
Call Stack (most recent call first):
```

Solu: https://answers.ros.org/question/199279/installation-from-source-fails-because-of-cv_bridge-include-dir/

Add that thing to the symlink directory:

`sudo ln -s /usr/include/opencv4/opencv2/ /usr/include/opencv`



Error2:

```bash
[ 10%] Built target image_pub_sub_cpp
/home/jetbot/catkin_ws/src/ros_essentials_cpp/src/topic03_perception/cpp/open_copy.cpp:1:10: fatal error: opencv/highgui.h: No such file or directory
 #include <highgui.h>
          ^~~~~~~~~~~~~~~~~~
compilation terminated.
ros_essentials_cpp/CMakeFiles/open_copy_cpp.dir/build.make:62: recipe for target 'ros_essentials_cpp/CMakeFiles/open_copy_cpp.dir/src/topic03_perception/cpp/open_copy.cpp.o' failed
make[2]: *** [ros_essentials_cpp/CMakeFiles/open_copy_cpp.dir/src/topic03_perception/cpp/open_copy.cpp.o] Error 1
CMakeFiles/Makefile2:538: recipe for target 'ros_essentials_cpp/CMakeFiles/open_copy_cpp.dir/all' failed
make[1]: *** [ros_essentials_cpp/CMakeFiles/open_copy_cpp.dir/all] Error 2
make[1]: *** Waiting for unfinished jobs....
```

Solu:

https://stackoverflow.com/questions/14665245/compiling-in-opencv

 Replace that things with

```bash
#include "opencv2/highgui/highgui.hpp"
```



Error3:

```bash
[ 52%] Generating EusLisp code from ros_essentials_cpp/FibonacciResult.msg
/home/jetbot/catkin_ws/src/ros_essentials_cpp/src/topic03_perception/cpp/open_copy.cpp: In function ‘int main()’:
/home/jetbot/catkin_ws/src/ros_essentials_cpp/src/topic03_perception/cpp/open_copy.cpp:18:111: error: ‘CV_LOAD_IMAGE_COLOR’ was not declared in this scope
        image = imread("/home/riotu/catkin_ws/src/ros_essentials_cpp/src/topic03_perception/images/chess.jpg", CV_LOAD_IMAGE_COLOR);   // Read the file "image.jpg".
                                                                                                               ^~~~~~~~~~~~~~~~~~~
/home/jetbot/catkin_ws/src/ros_essentials_cpp/src/topic03_perception/cpp/open_copy.cpp:29:31: error: ‘CV_WINDOW_AUTOSIZ
’ was not declared in this scope
        namedWindow( "window", CV_WINDOW_AUTOSIZE ); // Create a window for display.
                               ^~~~~~~~~~~~~~~~~~
/home/jetbot/catkin_ws/src/ros_essentials_cpp/src/topic03_perception/cpp/open_copy.cpp:29:31: note: suggested alternative: ‘CV_MINOR_VERSION’
        namedWindow( "window", CV_WINDOW_AUTOSIZE ); // Create a window for display.
                               ^~~~~~~~~~~~~~~~~~
                               CV_MINOR_VERSION
```

Solu:

- https://stackoverflow.com/questions/24439548/opencv-tutorial-load-and-display-an-image-codeblocks-fedora20
- https://stackoverflow.com/questions/18682201/opencv-where-can-i-find-cv-window-autosize-constants



### Testing your installation with C++ nodes


```bash
$ roscore
$ rosrun ros_essentials_cpp talker_node
$ rosrun ros_essentials_cpp listener_node
```

![image-20211125120454831](../images/all_in_one/image-20211125120454831.png)

![image-20211125120500760](../images/all_in_one/image-20211125120500760.png)

### Testing and fixing installation with Python nodes

```bash
$ rosrun ros_essentials_cpp talker.py
$ rosrun ros_essentials_cpp listener.py
```

![image-20211125120603758](../images/all_in_one/image-20211125120603758.png)

![image-20211125120616652](../images/all_in_one/image-20211125120616652.png)



### Creating ROS workspace

```bash
mkdir -p ~/catkin_ws/src
# Managing Your Environment
$ printenv | grep ROS
# ROS_ETC_DIR=/opt/ros/melodic/etc/ros
# ROS_ROOT=/opt/ros/melodic/share/ros
# ROS_MASTER_URI=http://localhost:11311
# ROS_VERSION=1
# ROS_PYTHON_VERSION=2
# ROS_PACKAGE_PATH=/opt/ros/melodic/share
# ROSLISP_PACKAGE_DIRECTORIES=
# ROS_DISTRO=melodic

source /opt/ros/melodic/setup.sh

# Create a ROS Workspace
mkdir catkin_ws
cd catkin_ws
mkdir -p src
cd src
catkin_init_workspace
printf "source ~/catkin_ws/devel/setup.bash" >> ~/.bashrc
cd ~/catkin_ws
catkin_make
source ~/catkin_ws/devel/setup.bash

# Checking ROS & Gazebo Versions
# On Ubunutu 16.04, you should have ROS Kinetic with Gazebo 7, whereas on Ubuntu 18.04, you should have ROS Melodic with Gazebo 9
rosversion -d
gazebo -v
```

Configuring Your ROS Environment (Optional)

```bash
$ export ROS_HOSTNAME=localhost
$ export ROS_MASTER_URI=http://localhost:11311	# Default port, just FYI
```



###  Creating ROS packages

```bash
#
catkin_create_pkg ros_basics_tutorial std_msgs rospy roscpp	# catkin_create_pkg <pkg_name> <dependencies...>
```



### Installing ROS dependency with rosdep

- http://wiki.ros.org/rosdep

```bash
# ROS Noetic
sudo apt-get install python3-rosdep
# ROS Melodic and earlier
sudo apt-get install python-rosdep
# On non ubuntu platforms, Use pip:
sudo pip install -U rosdep

# Initializing rosdep
sudo rosdep init
rosdep update

### Using rosdep: Install dependency of a particular package
$  rosdep install AMAZING_PACKAGE
### Install dependency of all packages in the workspace
# This usecase shows even more powerful feature of rosdep. Go to the top directory of your catkin workspace where the source code of the ROS packages you'd like to use are. Then run:
$ rosdep install --from-paths src --ignore-src -r -y
# This command magically installs all the packages that the packages in your catkin workspace depend upon but are missing on your computer.

### Use source-installed rosdep
# Clone the development repository. This doesn't need to be done in a directory in ROS_PACKAGE_PATH. Then at its top directory, source setup.sh. In concrete:
$ git clone https://github.com/ros-infrastructure/rosdep
$ cd rosdep
$ source setup.sh


```



### How to Calibrate a Monocular Camera

- http://wiki.ros.org/camera_calibration/Tutorials/MonocularCalibration

```bash
# Start by getting the dependencies and compiling the driver. Make sure that your monocular camera is publishing images over ROS. Let's list the topics to check that the images are published:
$ rosdep install camera_calibration

# This will show you all the topics published, check to see that there is an image_raw topic. The default topics provided by most ROS camera drivers are:
$ rostopic list

# This will open up the calibration window which will highlight the checkerboard:
$ rosrun camera_calibration cameracalibrator.py --size 8x6 --square 0.108 image:=/camera/image_raw camera:=/camera
```





### ROS Command cheatsheet	



```bash
roscore	# Starting ros master node

roscd	# Taking me into the default ros workspace

# Run some ros package
$ rosrun ros_essentials_cpp talker_node
$ rosrun ros_essentials_cpp listener_node
$ rosrun ros_essentials_cpp talker.py
$ rosrun ros_essentials_cpp listener.py

rosrun riotu ros training talker.py

# Show all urls
rostopic list

# Launch gazebo
roslaunch gazebo_ros empty_world.launch

# Launch rviz
rosrun rviz rviz
```





### Common ROS Q&A

```bash
# Where is the workspace for ROS distro that you installed?
$ ls /opt//ros/melodic/
```

- How to check all the env variable define for ROS?

```bash
jetbot@jetbot-desktop:~$ printenv | grep ROS
# ==> Output
ROS_ETC_DIR=/opt/ros/melodic/etc/ros
ROS_ROOT=/opt/ros/melodic/share/ros
ROS_MASTER_URI=http://localhost:11311
ROS_VERSION=1
ROS_PYTHON_VERSION=2
ROS_PACKAGE_PATH=/home/jetbot/catkin_ws/src:/opt/ros/melodic/share
ROSLISP_PACKAGE_DIRECTORIES=/home/jetbot/catkin_ws/devel/share/common-lisp
ROS_DISTRO=melodic
```





## Fun Fact

- Types of Robots, https://robots.ieee.org/learn/types-of-robots/
- The PR2 is one of the most advanced research robots ever built. Each PR2, short for Personal Robot 2, costs U.S. $400,000







## Reference:

- Implementing ORB-SLAM on Ubuntu 18.04 & ROS Melodic, https://medium.com/@mhamdaan/implementing-orb-slam-on-ubuntu-18-04-ros-melodic-606e668deffa
- YouTube, Justin Huang ROS Tutorial, https://www.youtube.com/watch?v=9U6GDonGFHw&list=PLJNGprAk4DF5PY0kB866fEZfz6zMLJTF8





# Other encountered problem



## Q: How to SSH to a robot that is only accessible on your LAN but not remotely.  

- Problem Description: Basically, your ISP didn’t provide you with a public IP address, so that IP address that you saw in your robot is a private IP address, and it’s not possible to connect to your machine directly via the internet.  Therefore, if you want to expose your localhost server behind a NAT or firewall to the public internet for development of testing purpose, there are two solution for this problem: **1) Router Configuration:** This can be solved by configuring NAT (Network Address Translation) on your router, but this doesn’t always work, and it requires you to change the configuration on your router, which isn’t always desirable. This solution also doesn’t work when you don’t have admin access on your network. **2) Ngrok**. Ngrok is a free, open source and cross-platform reverse proxy server for exposing local servers behind NATs and firewalls to the public Internet over secure tunnels. It is a remarkable computer program that you can use to implement personal cloud services directly from home. It essentially establishes secure tunnels to your localhost, thus enabling you to: run demos of web sites before actual deployment, testing mobile apps connected to your locally running backend and building web-hook consumers on your development machine.

- Code:

```
$ mkdir ngrok
$ cd ngrok/
$ wget -c https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-arm64.zip	# Note: you need to check your CPU architecture first, with command 'lscpu', and 'chmod +rx ngrok' to make it executable.
$ unzip ngrok-stable-linux-arm64.zip
$ ls
$ ./ngrok authtoken <your_auth_token>
$ ./ngrok tcp 22	# ngrok TCP tunnels allow you to expose any networked service that runs over TCP. This is commonly used to expose SSH, game servers, databases and more.
```

- Reference: [1-3 are important, 4-6 doesn’t work for this case]
  1. ngrok Dashboard, https://dashboard.ngrok.com/get-started/tutorials
  2. How to Test Local Websites or Apps on Internet Using Ngrok, https://www.tecmint.com/test-local-websites-on-internet-using-ngrok/
  3. How to use ngrok to remote ssh to rpi(Raspberry Pi)?, https://forums.raspberrypi.com/viewtopic.php?t=77499
  4. How to Create SSH Tunneling or Port Forwarding in Linux, https://www.tecmint.com/create-ssh-tunneling-port-forwarding-in-linux/
  5. 11 Best Tools to Access Remote Linux Desktop, https://www.tecmint.com/best-remote-linux-desktop-sharing-software/
  6. How to Install and Configure VNC Server in CentOS 7, https://www.tecmint.com/install-and-configure-vnc-server-in-centos-7/



## Q: How to Fix “No route to host” SSH Error in Linux, https://www.tecmint.com/fix-no-route-to-host-ssh-error-in-linux/

