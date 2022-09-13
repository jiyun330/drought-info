let totalData; //총 데이터 수
let dataPerPage; //한 페이지에 나타낼 글 수
let pageCount = 10; //페이징에 나타낼 페이지 수
let globalCurrentPage=1; //현재 페이지

$(document).ready(function() {
    //dataPerPage 선택값 가져오기
    dataPerPage = $("#dataPerPage").val();
    
    $.ajax({ // ajax로 데이터 가져오기
        method: "POST",
        url: "https://api.odcloud.kr/api/15049892/v1/uddi:b2e3f7da-5299-4c19-a8d5-b62044c7b206?perPage=1200&serviceKey=drigi%2Bft%2BkKmJ%2Bcg7Ooh79TfrsU3ivt0XnGid%2Bw%2FlGT30jh9RsRm%2Fn2PV9RY2gypYMKjCWxdU84oOh%2FPwffURg%3D%3D",
        dataType: "json",
        success: function (d) {
            //totalData 구하기
            totalData = d.data.length
            dataList = d.data
            
            //글 목록 표시 호출 (테이블 생성)
            displayData(1, dataPerPage, totalData);
            
            //페이징 표시 호출
            paging(totalData, dataPerPage, pageCount, 1);
        }
    });

});

// 페이징
function paging(totalData, dataPerPage, pageCount, currentPage) {
    console.log("currentPage : " + currentPage);
  
    totalPage = Math.ceil(totalData / dataPerPage); //총 페이지 수
    
    if(totalPage<pageCount){
      pageCount=totalPage;
    }
    
    let pageGroup = Math.ceil(currentPage / pageCount); // 페이지 그룹
    let last = pageGroup * pageCount; //화면에 보여질 마지막 페이지 번호
    
    if (last > totalPage) {
      last = totalPage;
    }
  
    let first = last - (pageCount - 1); //화면에 보여질 첫번째 페이지 번호
    let next = last + 1;
    let prev = first - 1;
  
    let pageHtml = "";
  
    if (prev > 0) {
      pageHtml += "<li><a href='#' id='prev'> 이전 </a></li>";
    }
  
   //페이징 번호 표시 
    for (var i = first; i <= last; i++) {
      if (currentPage == i) {
        pageHtml +=
          "<li class='on'><a href='#' id='" + i + "'>" + i + "</a></li>";
      } else {
        pageHtml += "<li><a href='#' id='" + i + "'>" + i + "</a></li>";
      }
    }
  
    if (last < totalPage) {
      pageHtml += "<li><a href='#' id='next'> 다음 </a></li>";
    }
  
    $("#pagingul").html(pageHtml);
    let displayCount = "";
    displayCount = "현재 1 - " + totalPage + " 페이지 / " + totalData + "건";
    $("#displayCount").text(displayCount);
  
  
    //페이징 번호 클릭 이벤트 
    $("#pagingul li a").click(function () {
        let $id = $(this).attr("id");
        selectedPage = $(this).text();
    
        if ($id == "next") selectedPage = next;
        if ($id == "prev") selectedPage = prev;
        
        //전역변수에 선택한 페이지 번호를 담는다...
        globalCurrentPage = selectedPage;
        //페이징 표시 재호출
        paging(totalData, dataPerPage, pageCount, selectedPage);
        //글 목록 표시 재호출
        displayData(selectedPage, dataPerPage, totalData);
    });
}

//현재 페이지(currentPage)와 페이지당 글 개수(dataPerPage) 반영
function displayData(currentPage, dataPerPage, totalData) {
    let chartHtml = "";

    currentPage = Number(currentPage);
    dataPerPage = Number(dataPerPage);
    totalData = Number(totalData);

    chartHtml = "<tr><th>번호</th><th>뉴스제목</th><th>키워드</th><th>뉴스매체</th><th>게시일자</th></tr>"

    for (
        var i = (totalData-((currentPage-1)*dataPerPage))-1;
        i > (totalData-(currentPage*dataPerPage))-1;
        i--
    ) {
        chartHtml +=
        "<tr onclick='goNews()'><td id='newsNum'>" + i +
        "</td><td id='title'>" +
        dataList[i].뉴스제목 +
        "</td><td id='newsKey'>" +
        dataList[i].키워드 +
        "</td><td id='newsSite'>" +
        dataList[i].뉴스매체 +
        "</td><td id='newsData'>" +
        dataList[i].게시일자 +
        "</td></a></tr>";

    } //dataList는 임의의 데이터임.. 각 소스에 맞게 변수를 넣어주면 됨...
    $("#dataTableBody").html(chartHtml);
}

// 페이지 옵션 클릭시
$("#dataPerPage").change(function () {
    dataPerPage = $("#dataPerPage").val();
    //전역 변수에 담긴 globalCurrent 값을 이용하여 페이지 이동없이 글 표시개수 변경 
    paging(totalData, dataPerPage, pageCount, globalCurrentPage);
    displayData(globalCurrentPage, dataPerPage, totalData);
})

$('#title').click(function () {
    dName = $('#title').val();
    console.log(dName);
})