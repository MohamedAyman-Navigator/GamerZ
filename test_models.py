import google.generativeai as genai

# PASTE YOUR KEY HERE
genai.configure(api_key="AIzaSyCGe0OgEN-klfv2yF7ImEszCIwEmfvF5Pw")

print("Listing available models...")
for m in genai.list_models():
    if 'generateContent' in m.supported_generation_methods:
        print(m.name)