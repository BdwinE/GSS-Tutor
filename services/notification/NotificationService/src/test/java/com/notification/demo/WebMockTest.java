package com.notification.demo;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.notification.demo.controller.NotificationController;
import com.notification.demo.model.Notification;
import com.notification.demo.service.NotificationService;

@RunWith(SpringRunner.class)
@WebMvcTest(NotificationController.class)
public class WebMockTest {

	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private NotificationService service;
	
	@MockBean
	private Notification notif;

	@Test
	public void sendMailShouldReturnConfirmation() throws Exception {
		mockMvc.perform(get("/send-mail"))
			.andDo(print())
			.andExpect(status().isOk());
	}
}