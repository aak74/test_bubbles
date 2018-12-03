var	container = document.querySelector('.container'),
	countBubbles = 0,
	arrD = [];

// ���������� ��������� ����� ����� ����� min (������������) � max (�� ������� max)
// ������������� ������ Math.round() ���� ��� ������������� �������������!
//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
	
function createBubbles () {
	var contentWeight = container.clientWidth - 50,
		minD = 20,
		maxD = Math.floor(contentWeight / 10),
		sumD = 0,
		newD = 0,
		i = 0;
	
	//������ ������ ��������� �����
	while (sumD < contentWeight) {
		newD = getRandomInt(minD, maxD);
		sumD += newD;
		sumD += 10; //���� �������
		if (sumD < contentWeight) {
			arrD[i] = newD;
			i++;
		}
	}
	countBubbles = i;
	
	//������ ���� � ���������������� ����������
	for (var i = 0; i < countBubbles; i++) {
		var newBubble = document.createElement("div");
		newBubble.classList.add('bubble');
		
		/*���� ����*/
		var colorBubble = 'bubbleYellow';
		if (i%4 === 0) {
			colorBubble = 'bubbleRed';
		}
		else if (i%3 === 0) {
			colorBubble = 'bubbleBlue';
		}
		else if (i%2 === 0) {
			colorBubble = 'bubbleGreen';
		}
		newBubble.classList.add(colorBubble);
		
		var bublleOptions = arrD[i] + 'px';
		newBubble.style.width = bublleOptions;
		newBubble.style.height = bublleOptions;
		newBubble.style.borderRadius = bublleOptions;
		
		newBubble.textContent = arrD[i];	//��� �������
		container.appendChild(newBubble);
	}
}

function sortBubbles () {
	var i = 0;
	var sortI_id = setTimeout(function sortI (i) 
	{
		var flagWasSwap = false;
		var j = 0;
		var sortJ_id = setTimeout(function sortJ (j) 
		{
			var bubbles = document.querySelectorAll('.bubble');
			var bubbleLeft = bubbles[j];
			var bubbleRight = bubbles[j+1];
			
			//�������� ������������ ����
			bubbleLeft.classList.add('bubbleInFocus');
			bubbleRight.classList.add('bubbleInFocus');
			
			if (arrD[j] > arrD[j+1]) {
				//������ ������� ��������
				var tempD = arrD[j];
				arrD[j] = arrD[j+1];
				arrD[j+1] = tempD;
				
				setTimeout(function() 
				{
					bubbleLeft.classList.add('bubbleFalse');
					bubbleRight.classList.add('bubbleFalse');
				}, 500);
				
				setTimeout(function() 
				{
					//������ ������� ����
					//bubbleRight.classList.add('moveBubbleToLeft');
					//bubbleLeft.classList.add('moveBottomRight');
					container.removeChild(bubbleRight);
					container.insertBefore(bubbleRight, bubbleLeft);
				}, 1000);
				
				flagWasSwap = true;
			}
			
			setTimeout(function() 
			{
				bubbleLeft.classList.remove('bubbleInFocus');
				bubbleLeft.classList.remove('bubbleFalse');
				//bubbleLeft.classList.remove('moveBottomRight');
				
				bubbleRight.classList.remove('bubbleInFocus');
				bubbleRight.classList.remove('bubbleFalse');
				//bubbleRight.classList.remove('moveBubbleToLeft');
			}, 2000);
			
			j++;
			if (j === countBubbles-i) {
				clearTimeout(sortJ_id);
				return;
			}
			setTimeout(sortJ, 2000, j);
		}, 1000, 0);
		if (!flagWasSwap) {
			//�� ���� �� ������ ������ �� ������
			//�������� ������� �� ����������
			clearTimeout(sortI_id);
		}
		i++;
		if (i === countBubbles) return;
		setTimeout(sortI, 2000*countBubbles, i);
	}, 1000, 0);
}








