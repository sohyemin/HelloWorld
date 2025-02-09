/**
 * ocr.js
 */
 
$(document).ready(function(){
	callAjax();

	$('#btnClose').on('click', function(){
		$('.modal-container').removeClass('active');
	});
	
	$('.chatbot_btn').on('click',function(){
		$('.modal-container').addClass('active');
	});

 	$('#chatbotForm').on('submit', function(){
		event.preventDefault();
 		//폼이 submit 되지 않도록 기본 기능 중단
 		
 		//message가 빈값인 경우 확인 메시지 출력
 		if($('#message').val()==""){
 			alert("메시지를 입력하세요");
 			$('#message').focus();
 			return false;
 		}
 		
 		// 챗봇 창에 메세지 추가
 		$('#chatBox').append('<div class="msgBox send"><span id="in"><span>'+
 							$('#message').val() + '</span></span></div><br>');
 		
 		callAjax();
 		
 		$('#message').val(''); // 입력란 비우기
 	});// submit 종료
});

function callAjax() {
 		// 서버에 전송하고 결과 받아서 처리
 		$.ajax({
 			type:"post",
 			url:"/chatbot",
 			data: {"message": $('#message').val()},
 			success:function(result){
 				// 챗봇 창에 받은 메시지 추가
 				$('#chatBox').append('<div class="msgBox receive"><span id="in"><span>챗봇</span><br><span>' +
 											  result + '</span></span></div><br>');
 			
 				// 스크롤해서 올리기 : 스크롤 높이 값로 scrollTop 설정
 				$('#chatBox').scrollTop($('#chatBox').prop("scrollHeight"));
 				
 			},
 			error:function(){
 				alert("실패");
 			}
 		}); // ajax 종료 
 	}
 	
 	$('#plusBtn').on('click', function(){
		$('.chatbot_btn').addClass('active');
	});
	
  