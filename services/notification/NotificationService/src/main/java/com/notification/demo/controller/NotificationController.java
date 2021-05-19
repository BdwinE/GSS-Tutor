package com.notification.demo.controller;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.*;

import com.notification.demo.model.Notification;
import com.notification.demo.service.NotificationService;

@CrossOrigin
@RestController
public class NotificationController {
	@Autowired
	private NotificationService	notificationService;

	@Autowired
	private Notification notif;

	/**
	 * 
	 * @return
	 */
	@RequestMapping("send-mail")
	@ResponseBody
	public String send(@RequestParam Map<String,String> params) {
		
		notif.setEmailAddress(params.get("email"));
		notif.setTitle(params.get("title"));
		notif.setBody(params.get("body"));

		try {
			notificationService.sendEmail(notif);
		} catch (MailException mailException) {
			System.out.println(mailException);
		}
		return "Mail has been sent to the user.";
	}
}
