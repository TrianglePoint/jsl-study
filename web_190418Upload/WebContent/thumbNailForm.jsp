<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
</head>
<body>
  <h1>썸네일 이미지 폼 예제</h1>
  <form action="thumbNail.jsp" method="post" enctype="multipart/form-data">
    <span>이미지 파일  : </span><input type="file" name="file"/><br />
    <input type="submit" value="전송"/>
  </form>
</body>
</html>