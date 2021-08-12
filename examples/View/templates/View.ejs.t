---
to: examples/View/generated/<%=viewName%>View.php
force: true
---
<?php

class <%=viewName%>View <%=interfaces ? `implements ${interfaces}` : null%> {
<% if (interface_methods) { %>
<%-interface_methods%>
<% } %>
}
