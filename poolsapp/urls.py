from django.urls import include, path
from . import views
from . import api

from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'pools', api.PoolsViewSet, basename='pools')
router.register(r'questions', api.QuestionViewSet, basename='questions')

app_name = 'poolsapp'

urlpatterns = [
    path('', views.index, name='index'),
    path('create/', views.create_pool, name='create_pool'),
    path('pool/<int:pool_id>', views.pool ,name='pool'),

    #API
    path('api/', include(router.urls)),
]