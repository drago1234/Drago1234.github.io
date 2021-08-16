---
layout: post  # Required
title: 'Getting start everything' # Required
date: 2021-05-26  # Required
categories: [Hacking Skills, Starter] # Option
tags: []  # Option
permalink: getting_start_everything.html
toc: false # Option
excerpt: >- # Option
  Getting start something new can be uncomfortable and even timidating sometime. So for reducing the anxious and easing the stress, I provide some guildance here that I feel useful when I started picking up those Hacking Techs in the school.
---

## Table of contents
{: .no_toc .text-delta }

1. TOC
{: toc }

## Introduction
  Getting start something new can be uncomfortable and even timidating sometime. So for reducing the anxious and easing the stress for anyone who has passion to learn and grow, I shared some guildance here that I feel can be useful when I started picking up those Hacking Techs in the college.
![Comfort Zone](/assets/images/2021-05-26-getting-start-everything/Leaving-the-Comfort-Zone-Appendix.png)

## Getting Start with Jekyll
Here I will share a collection of link that I think useful that I was building my site。
### TOC: Table of Content

Here are some reference that might work to look at
- [Rendering table of contents in Jekyll](https://ouyi.github.io/post/2017/12/31/jekyll-table-of-contents.html)
### Jekyll theme
- [Customizing Jekyll theme](https://ouyi.github.io/post/2017/12/23/jekyll-customization.html)
- [Memory Spills](https://github.com/ouyi/ouyi.github.io)
- And all open source Jekyll-theme in github -- [https://github.com/topics/jekyll-theme](https://github.com/topics/jekyll-theme)


### Data Table 

- [CloudTable -- DataTables](https://www.datatables.net/download/)

### Markdown 
- [Basic Markdown Usage](https://www.markdownguide.org/basic-syntax/#headings)
- Jekyll-Markdown-Cheat-Sheet, [https://itopaloglu83.github.io/Jekyll-Markdown-Cheat-Sheet/](https://itopaloglu83.github.io/Jekyll-Markdown-Cheat-Sheet/)
- markdown-cheatsheet-online, [https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)

### Emoji

### Other bugs that you might encounter:
- Fix "GitHub Metadata: No GitHub API authentication could be found" error:
    1. For Max OS user, [https://idratherbewriting.com/documentation-theme-jekyll/mydoc_install_jekyll_on_mac.html#githuberror](https://idratherbewriting.com/documentation-theme-jekyll/mydoc_install_jekyll_on_mac.html#githuberror)
    2. For Windows User, [Knight Codes Doc](https://knightcodes.com/miscellaneous/2016/09/13/fix-github-metadata-error.html)


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