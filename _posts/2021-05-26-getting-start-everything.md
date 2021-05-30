---
layout: post
title: 'Getting start everything'
date: '2021-05-26'
categories:
  - Hacking Skills, Starter
tags:
excerpt: >-
  Getting start something new can be uncomfortable and even timidating sometime. So for reducing the anxious and easing the stress, I provide some guildance here that I feel useful when I started picking up those Hacking Techs in the school.
---

## Introduction
  Getting start something new can be uncomfortable and even timidating sometime. So for reducing the anxious and easing the stress for anyone who has passion to learn and grow, I shared some guildance here that I feel can be useful when I started picking up those Hacking Techs in the college.
![Comfort Zone](/assets/images/2021-05-26-getting-start-everything/Leaving-the-Comfort-Zone-Appendix.png)


## Getting start with Github
* Remember those several line of code when you start to setting up a new environment in the terminal. (Source: <a href="https://codemy.com/git">https://codemy.com/git</a>)

{% highlight c linenos %}
  $ git config --global user.name "Your Name"
  $ git config --global user.email "you@youraddress.com"
  $ git config --global push.default matching
  $ git config --global alias.co checkout
  $ git init
{% endhighlight %}

<p><small>** Be sure to change the “Your Name” and “you@youraddress.com” in the first two commands to your actual name and your actual email address. I suggest you use the same email address that you plan to use at github.com later.</small></p>

## Getting start with Web Development

- **HTML**: Understand everything Here<a href="https://www.w3schools.com/html/"> W3School HTML Tutorial</a>, and apply what you learned to createa a home page website like mine, <a href="https://drago1234.github.io/osu_html_home.html"> Home.html</a>.
- **CSS**: After you have a good grasp of those most commont tag element, you can start to dive into the CSS -- creating various kind of rule to style your website elements, such as Form (<a href="https://fontawesome.com/v4.7/icons/#form-control">Font Awesome</a>), Colors (<a href="https://htmlcolorcodes.com/">Color Codes </a>, <a href="https://coolors.co/palettes/trending/red,blue">Coolors</a>), Icons (<a href="https://fontawesome.com/v5.15/icons/abacus?style=solid">Font Awesome</a>, <a href="https://icofont.com/icons">IconFont</a>), Forms (<a href="https://formspree.io/">Formspree</a>), Pictures (<a href="https://unsplash.com/">Unsplash</a>), and all others things that can make your website looks more professional and pretty. The most popular framework for website design is called <a href="https://getbootstrap.com/docs/3.4/components/#panels">Bootstrap</a>. There are different version had evolved through the year, and I personally like to download their .css file, and mixing different elements from different versions.
- **Advance Topics**: After This point, you should have a good understand of those foundemental elements that people use to build their website. For learning some more advanced stuff, you can explore things like:
  - **Static site generator**: there are tons of generator in the internet, e.g., <a href="https://gohugo.io/">Hugo</a>, and more covered in this YouTube video -- <a href="https://www.youtube.com/watch?v=RsxTAuP_EQ8">Top 10 Static Site Generators in 2020 </a>.  So, what I am using? The one that I currently use is <a href="https://jekyllrb.com/">Jekyll</a>. Why? ==> It's just the first one that I heard, and I saw many researchers use it to build their personal blog website, because it provided some cover template that can be used off-the-shelf. 
  - **Marketing Tools**: <a href="https://analytics.google.com/analytics/academy/">Google Analytics</a> and <a href="https://marketingplatform.google.com/about/tag-manager/">Tag managment</a> are two most popular tools that people use for E-commerse, or marketing purpose. They allows you to collect data about your visitors, and understand how to developer your site better to attract more customers. Here are two tutorials that can help you to get started immediately: <a href="https://analytics.google.com/analytics/academy/course/6">Google Analytics for Beginners</a>, and <a href="https://analytics.google.com/analytics/academy/course/5">Google Tag Manager Fundamentals<a>, and their <a href="https://www.youtube.com/user/googleanalytics/playlists">YouTube Video Playlist</a>.
  - **JavaScript**: TBD 

FYI: Remeber the "learn enough to be dangerous principle" (Read the <a href="https://www.learnenough.com/our-philosophy">learning philosophy</a> here, if you don't know what I am taling about.). Don't try to master everything that I write down here. I am sure you can, but that won't worth your time, and I bet you have something more important to do with your time and effort. 

## Kramdown Syntax cheatsheet
* If you don't want to add extra blank linke, then you can include two backslash(\\) or two space between two consecutive sentences, e.g., \\
Line 1 \\
Line 2.

* Reference:
  - Kramdown Quick Reference: [https://kramdown.gettalong.org/quickref.html](https://kramdown.gettalong.org/quickref.html)
  - Markdown cheatsheet: [https://www.markdownguide.org/basic-syntax/#headings](https://www.markdownguide.org/basic-syntax/#headings)
  - TOC:
    - jekyll-table-of-contents(TOC): [https://sourabhbajaj.com/js/toc/](https://sourabhbajaj.com/js/toc/)
    - Table of Contents jQuery Plugin: [https://ndabas.github.io/toc/](https://ndabas.github.io/toc/)