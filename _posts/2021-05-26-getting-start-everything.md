---
title: 'Getting start everything'
date: '2021-05-26'
categories:
  - Hacking Skills
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

{% highlight ruby linenos %}
  def foo
    puts 'foo'
  end
{% endhighlight %}

{% highlight python linenos %}
# Import the library
import os
import torch
import torch.nn as nn
import torch.distributed as dist
from torch.multiprocessing import Process

torch.cuda.seed_all()
print(f"We have {torch.cuda.device_count()} GPU devices.")
print(f"Current using device: {torch.cuda.current_device()}")
print(f"Current GPU architecture: {torch.cuda.get_arch_list()}, with name: {torch.cuda.get_device_name()}, with capability: {torch.cuda.get_device_capability()}")

def statitic_report(device="cuda:0"):
	print(f"CUDA memory allocated by tensors: {torch.cuda.memory_allocated(device)}")
	print(f"Maximum CUDA memory allocated by tensors: {torch.cuda.max_memory_allocated(device)}")
	# print(f"Remove the unused cached memory: {torch.cuda.empty_cache()}")
	
	
	print(f"CUDA memory allocator state across all device: {torch.cuda.memory_snapshot()}")
	print(f"CUDA memory allocator statistics for a given device: {torch.cuda.memory_stats(device)}")
	print(f"Print the current memory allocator statistics for a given device: {torch.cuda.memory_summary(device)}")
  
	print(f"Current running gpu processes: {torch.cuda.list_gpu_processes(device)}")
{% endhighlight %}

<p><small>** Be sure to change the “Your Name” and “you@youraddress.com” in the first two commands to your actual name and your actual email address. I suggest you use the same email address that you plan to use at github.com later.</small></p>

to be continued...



