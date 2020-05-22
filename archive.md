---
layout: default
title: "Archive"
---

<div class="post-archives">
  {% for post in site.posts %}
    {% capture this_year %}{{ post.date | date: "%Y" }}{% endcapture %}
    {% capture next_year %}{{ post.previous.date | date: "%Y" }}{% endcapture %}
    {% if forloop.first %}
      <div class="archive-group" id="{{ this_year }}">
        <h2 class="year-head">{{ this_year }}</h2>
        <ul>
    {% endif %}
    <li>
      <p>
        <span>{{ post.date | date: "%B %d" }}&nbsp;&raquo;</span>
        <a href="{{ site.url }}{{ site.baseurl }}{{ post.url }}">
          {{ post.title }}
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
          <h2 class="year-head">{{ next_year }}</h2>
          <ul>
      {% endif %}
    {% endif %}
  {% endfor %}
</div>
