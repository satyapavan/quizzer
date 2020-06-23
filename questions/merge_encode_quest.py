import base64
import json
import time


current_quest = {}
new_quest = {}

def in_out_log(f):
    def _in_out_log(*args, **kwargs):
        args_repr = [repr(a) for a in args]
        kwargs_repr = [f"{k}={v!r}" for k, v in kwargs.items()]
        signature = ", ".join(args_repr + kwargs_repr)
        print('Entered into {}({})'.format(f.__name__, signature))
        start_time = time.perf_counter()
        retVal = f(*args, **kwargs)
        end_time = time.perf_counter()
        run_time = end_time - start_time
        print('Leaving {} in {:.3f} secs'.format(f.__name__, run_time))
        #logging.debug(f'--> END   - {f.__name__!r} returned {retVal!r} - in {run_time:.4f} secs')
        return retVal
    return _in_out_log

@in_out_log
def write_results(data):
    # Opening JSON file
    f = open('questions.json', 'w')
    f.write(json.dumps(data, indent=4))
    f.close()

@in_out_log
def load_current_data():
    # Opening JSON file
    f = open('questions.json', )

    # returns JSON object as
    # a dictionary
    data = json.load(f)

    # Iterating through the json
    # list
    for itrQ in data['quizzer']:
        print(itrQ)

    print(f"Length of current questions = {len(data['quizzer'])}")
    return data['quizzer']

@in_out_log
def load_new_questions():
    # Opening JSON file
    f = open('new_questions.json', )

    # returns JSON object as
    # a dictionary
    data = json.load(f)

    # Iterating through the json
    # list
    for itrQ in data['quizzer']:
        print(itrQ)
        itrQ['question'] = encode(itrQ['question'])

        for key, value in itrQ['answers'].items():
            itrQ['answers'][key] = encode(value)

        print(itrQ)

        # Closing file
    f.close()

    print(f"Length of New questions = {len(data['quizzer'])}")
    return data['quizzer']

def encode(data):
    # Standard Base64 Encoding
    encodedBytes = base64.b64encode(data.encode("utf-8"))
    return str(encodedBytes, "utf-8")

@in_out_log
def main():
    final_quest = {}
    final_quest['quizzer'] = load_new_questions() + load_current_data()

    print(f"Length of Final questions = {len(final_quest['quizzer'])}")
    print(final_quest)
    write_results(final_quest)

if __name__ == "__main__" : main()
