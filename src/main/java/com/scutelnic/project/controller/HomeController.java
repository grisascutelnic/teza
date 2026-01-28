package com.scutelnic.project.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

	@GetMapping({"/", "/home"})
	public String home() {
		return "index";
	}

	@GetMapping("/create-activity")
	public String createActivity() {
		return "create-activity";
	}

	@GetMapping("/activities")
	public String activities() {
		return "activities";
	}

	@GetMapping("/profile")
	public String profile() {
		return "profile";
	}

	@GetMapping("/calendar")
	public String calendar() {
		return "calendar";
	}
}


