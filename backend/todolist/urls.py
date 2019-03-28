from django.conf.urls import url
from . import views

urlpatterns = [
    # Do remember add a `$` here, or this will match all the URL. That being
    # said, all URL will be routed to the index view causing this website
    # malfunction.
    url(r'^$', views.FrontendAppView.as_view()),
]
