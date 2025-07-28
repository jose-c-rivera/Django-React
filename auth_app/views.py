from django.contrib.auth import authenticate, login, logout, get_user_model
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from auth_app.serializers import UserSignupSerializer
import json


@csrf_exempt
@require_POST
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username').lower()  # normalize to lowercase
        password = data.get('password')

        User = get_user_model()
        try:
            user_obj = User.objects.get(username__iexact=username)
            user = authenticate(request, username=user_obj.username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({"message": "Logged in", "username": user.username})
        except User.DoesNotExist:
            pass
        return JsonResponse({"error": "Invalid credentials"}, status=401)


@csrf_exempt
@require_POST
def logout_view(request):
    logout(request)
    return JsonResponse({"message": "Logged out"})


def home_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"error": "Authentication required"}, status=401)
    
    return JsonResponse({"message": f"Welcome, {request.user.username}!"})


class SignupView(generics.CreateAPIView):
    serializer_class = UserSignupSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Authenticate and log in user immediately
        user = authenticate(
            username=request.data.get("username"),
            password=request.data.get("password"),
        )
        if user is not None:
            login(request, user)

        return Response(
            {"message": "User created successfully", "username": user.username},
            status=status.HTTP_201_CREATED,
        )


@login_required
def current_user(request):
    user = request.user
    return JsonResponse({
        "username": user.username,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
    })