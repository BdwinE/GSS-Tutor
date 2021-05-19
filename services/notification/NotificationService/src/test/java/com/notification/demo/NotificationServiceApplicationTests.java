package com.notification.demo;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.notification.demo.controller.NotificationController;

@SpringBootTest
class NotificationServiceApplicationTests {

	@Autowired
	private NotificationController controller;
	
	@Test
	void contextLoads() {
		assertThat(controller).isNotNull();
	}

}
