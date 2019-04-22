<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sql" uri="http://java.sun.com/jsp/jstl/sql" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
</head>
<body>
<sql:query var="rs" dataSource="jdbc/OracleDB">
	select count(*)
</sql:query>
<c:forEach var="row" items="${rs.rows}">
	${row.name}
</c:forEach>
</body>
</html>