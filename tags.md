---
layout: default
title: "Tags"
---

<!-- Displaying all the tag had defined in the site.tag, and sorted in alphabetical order. Note: assign and capture just two keyword for defined a new variables in jekyll. -->
<div class="tag-list">
  {% assign separator = "; " %}
  {% assign tag_list = "" %}
  {% for tag in site.tags %}
    {% capture tag_name %}{{ tag | first }}{% endcapture %}
    {% assign tag_list = tag_list | append: tag_name %}
    {% unless forloop.last %}
      {% assign tag_list = tag_list | append: separator %}
    {% endunless %}
  {% endfor %}
  {% assign tag_list = tag_list | split: separator | sort %}
  {% for tag_name in tag_list %}
    {% capture tag_id %}{{ tag_name | downcase | replace: "_", "-" }}{% endcapture %}
    <a class="tag-name" href="#{{ tag_id }}"><i class="fa fa-tag" aria-hidden="true"></i>&nbsp;{{ tag_name }}</a>
  {% endfor %}
</div>

<div class="tag-archives">
  {% for tag_name in tag_list %}
    {% capture tag_id %}{{ tag_name | downcase | replace: "_", "-" }}{% endcapture %}
    <div class="archive-group" id="{{ tag_id }}">
      <h5 class="tag-head">{{ tag_name }}</h5>
      <ul>
        {% for post in site.tags[tag_name] %}
          <li>
            <p>
              <a href="{{ site.url }}{{ site.baseurl }}{{ post.url }}">
                  {{ post.title }}
              </a>
              <span>&raquo;&nbsp;{{ post.date | date: "%B %d, %Y" }}</span>
            </p>
          </li>
        {% endfor %}
      </ul>
    </div>
  {% endfor %}
</div>
