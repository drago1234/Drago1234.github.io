--- 
layout: default
title: "Markdown practise here"
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{: toc }



# Headings
# H1
## H2
### H3
#### H4
##### H5
###### H6


# Paragraph
Here's a paragraph.

# Line break

Here's another one \\
with a line break.

# Bold
**bold text** 
__bold also__


Italic
*italic text*  
_italic also_

> Dorothy followed her through many of the beautiful rooms in her castle.
>
>> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.
> #### The quarterly results look great!
>
> - Revenue was off the chart.
> - Profits were higher than ever.
>
>  *Everything* is going according to **plan**.
> 

http://www.example.com

# Quick Jekyll markdown references 

layout: post
title: Markdown Style Guide
---

This is a demo of all styled elements in Jekyll Now. 

[View the markdown used to create this post](https://gist.github.com/roachhd/779fa77e9b90fe945b0c).

This is a paragraph, it's surrounded by whitespace. Next up are some headers, they're heavily influenced by GitHub's markdown style.

## Header 2 (H1 is reserved for post titles)##

### Header 3

#### Header 4
 
A link to [Jekyll Now](http://github.com/barryclark/jekyll-now/). A big ass literal link <http://github.com/barryclark/jekyll-now/>
  
An image, located within /images

![an image alt text]({{ site.baseurl }}/assets/images/dragon.jpg "an image title")

* A bulletted list
- alternative syntax 1
+ alternative syntax 2
  - an indented list item

1. An
2. ordered
3. list

Inline markup styles: 

- _italics_
- **bold**
- `code()` 
 
> Blockquote
>> Nested Blockquote 
 
Syntax highlighting can be used by wrapping your code in a liquid tag like so:

{{ "{% highlight javascript " }}%}  
/* Some pointless Javascript */
var rawr = ["r", "a", "w", "r"];
{{ "{% endhighlight " }}%}  

creates...

{% highlight javascript %}
/* Some pointless Javascript */
var rawr = ["r", "a", "w", "r"];
{% endhighlight %}
 
Use two trailing spaces  
on the right  
to create linebreak tags  
 
Finally, horizontal lines
 
----
****




* Here we can dispalying an index of all posts with following code snippets:

<div class="code-example" markdown="1">
**bold text**  
__bold also__
</div>

```markdown
**bold text**  
__bold also__
```

<div class="code-example">
  <ul>
    {% for post in site.posts %}
      <li>
        <a href="{{ post.url }}">{{ post.title }}</a>
      </li>
    {% endfor %}
  </ul>
</div>

And here is the result:
<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>