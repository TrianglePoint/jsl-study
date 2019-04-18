<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
<style>
  td{
    text-align: center;
  }
</style>
</head>
<body>
  <form action="fileUpload.jsp" method="post" enctype="multipart/form-data">
	  <table border="1">
	    <tr><th colspan="2">파일 업로드 폼</th></tr>
	    <tr>
	      <td>올린 사람:</td><td><input type="text" name="name"/></td>
	    </tr>
	    <tr>
	      <td>제목:</td><td><input type="text" name="subject"/></td>
	    </tr>
	    <tr>
	      <td>파일 명1:</td><td><input type="file" name="fileName1"/></td>
	    </tr>
	    <tr>
	      <td>파일 명2:</td><td><input type="file" name="fileName2"/></td>
	    </tr>
	    <tr>
	      <td colspan="2" align="center"><input type="submit" value="전송"/></td>
	    </tr>
	  </table>
  </form>
</body>
</html>