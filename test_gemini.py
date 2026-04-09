import os
import sys
import time

# Ensure imports work
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

try:
    from medical_assisstant import orchestrate_request
    print("Import successful.")
    
    start_time = time.time()
    print("Testing chat response...")
    response = orchestrate_request("Hi MedAssistant, how are you?", target_language="English")
    end_time = time.time()
    
    print(f"\nResponse: {response}")
    print(f"\nTime taken: {end_time - start_time:.2f} seconds")
    
    if (end_time - start_time) < 2.0:
        print("\nSUCCESS: Speed target ( < 2s) met!")
    else:
        print("\nWARNING: Speed target ( < 2s) NOT met. Optimization needed.")

except Exception as e:
    print(f"\nERROR: {e}")
    import traceback
    traceback.print_exc()
