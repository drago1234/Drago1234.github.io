---
layout: default
title: "Archive"
---

<!-- Refers to this page, https://www.computerhope.com/issues/ch000049.htm#topbot, to learn more about how to create links to sections on the same page in HTML -->
<div class="post-archives">
  {% for post in site.posts %}
    {% capture this_year %}{{ post.date | date: "%Y" }}{% endcapture %}
    {% capture next_year %}{{ post.previous.date | date: "%Y" }}{% endcapture %}
    {% if forloop.first %}
    <div class="archive-group" id="{{ this_year }}">
      <h5 id="{{this_year}}">{{ this_year }}</h5>
      <!-- <a href="#{{this_year}}">{{ this_year }}</a> -->
      <ul>
    {% endif %}
          <li>
            <p>
              <span>{{ post.date | date: "%Y-%m-%d" }}&nbsp;&raquo;</span>
              <a href="{{ site.url }}{{ site.baseurl }}{{ post.url }}">
                {{ post.title | capitalize }}
              </a>
            </p>
          </li>
    {% if forloop.last %}
      </ul>
    </div>
    {% else %}
      {% if this_year != next_year %}
        </ul>
        </div>
        <div class="archive-group" id="{{ next_year }}">
          <h5 id="next_year">{{ next_year }}</h5>
          <!-- <a href="#{{next_year}}">{{ next_year }}</a> -->
          <ul>
      {% endif %}
    {% endif %}
  {% endfor %}
</div>


<!-- Option 2: Taken from here -->
<!-- <ul class="tags-box">
{% if site.posts != empty %}
    {% for post in site.posts %}
        {% capture this_year %}{{ post.date | date: "%Y" }}{% endcapture %}
        {% unless year == this_year %}
            {% assign year = this_year %}
            {% unless post == site.posts.first %}
            {% endunless %}
            <li id="{{ year }}">{{ year }}</li>
        {% endunless %}
        <time datetime="{{ post.date | date:"%Y-%m-%d" }}">
        {{ post.date | date:"%Y-%m-%d" }}
        </time>
        &raquo; <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title | capitalize }}</a><br />
    {% endfor %}
{% else %}
    <span>No posts</span>
{% endif %}
</ul> -->
