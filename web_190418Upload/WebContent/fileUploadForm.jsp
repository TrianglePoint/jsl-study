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
	    <tr><th colspan="2">���� ���ε� ��</th></tr>
	    <tr>
	      <td>�ø� ���:</td><td><input type="text" name="name"/></td>
	    </tr>
	    <tr>
	      <td>����:</td><td><input type="text" name="subject"/></td>
	    </tr>
	    <tr>
	      <td>���� ��1:</td><td><input type="file" name="fileName1"/></td>
	    </tr>
	    <tr>
	      <td>���� ��2:</td><td><input type="file" name="fileName2"/></td>
	    </tr>
	    <tr>
	      <td colspan="2" align="center"><input type="submit" value="����"/></td>
	    </tr>
	  </table>
  </form>
</body>
</html>