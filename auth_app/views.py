from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
import json

@csrf_exempt
def login_view(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=400)

    data = json.loads(request.body)
    user = authenticate(username=data.get("username"), password=data.get("password"))

    if user:
        login(request, user)
        return JsonResponse({"message": "Logged in", "username": user.username})
    return JsonResponse({"error": "Invalid credentials"}, status=401)


@csrf_exempt
def logout_view(request):
    logout(request)
    return JsonResponse({"message": "Logged out"})


def home_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"error": "Authentication required"}, status=401)
    
    return JsonResponse({"message": f"Welcome, {request.user.username}!"})
