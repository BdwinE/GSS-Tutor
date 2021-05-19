package com.notification.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.notification.demo.model.Notification;

@Service
public class NotificationService {

	private JavaMailSender javaMailSender;
	
	/**
	 * 
	 * @param javaMailSender
	 */
	@Autowired
	public NotificationService(JavaMailSender javaMailSender) {
		this.javaMailSender = javaMailSender;
	}

	/**
	 * 
	 * @param notification
	 * @throws MailException
	 */

	public String sendEmail(Notification notif) throws MailException {

		SimpleMailMessage mail = new SimpleMailMessage();
		mail.setTo(notif.getEmailAddress());
		mail.setSubject(notif.getTitle());
		mail.setText(notif.getBody());

		javaMailSender.send(mail);
		
		return "email sent";
	}

}
