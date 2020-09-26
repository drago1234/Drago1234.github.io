---
layout: default
title: "Categories"
---

<div class="category-list">
  {% assign separator = "; " %}
  {% assign category_list = "" %}
  {% for category in site.categories %}
    {% capture category_name %}{{ category | first }}{% endcapture %}
    {% assign category_list = category_list | append: category_name %}
    {% unless forloop.last %}
      {% assign category_list = category_list | append: separator %}
    {% endunless %}
  {% endfor %}
  {% assign category_list = category_list | split: separator | sort %}
  {% for category_name in category_list %}
    {% capture category_id %}{{ category_name | downcase | replace: "_", "-" }}{% endcapture %}
    <a class="category-name" href="#{{ category_id }}"><i class="fa fa-folder-open" aria-hidden="true"></i>&nbsp;{{ category_name }}</a>
  {% endfor %}
</div>

<div class="category-archives">
  {% for category_name in category_list %}
    {% capture category_id %}{{ category_name | downcase | replace: "_", "-" }}{% endcapture %}
    <div class="archive-group" id="{{ category_id }}">
      <h5 class="category-head">{{ category_name }}</h5>
      <ul>
        {% for post in site.categories[category_name] %}
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
