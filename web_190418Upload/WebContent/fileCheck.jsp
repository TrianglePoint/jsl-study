<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%
  request.setCharacterEncoding("euc-kr");
  String name = request.getParameter("name");
  String subject = request.getParameter("subject");
  String filename1 = request.getParameter("filename1");
  String filename2 = request.getParameter("filename2");
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
</head>
<body>
<span>�ø� ���: <%=name %></span><br />
<span>����: <%=subject %></span><br />
<span>���� ��1: <a href="upload/<%=filename1%>"><%=filename1 %></a></span><br />
<span>���� ��2: <a href="upload/<%=filename2%>"><%=filename2 %></a></span>
</body>
</html>