import subprocess
import signal
import traceback
import colorama
from pathlib import Path
from os import system, name
from threading import Timer
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

from build import build, SRC_PATH

DEBOUNCE_SECS = 2
ERR_MSG = colorama.Fore.YELLOW + '\nPyx transpilation failed because of the following error:\n' + colorama.Fore.RESET


def clear():
    if name == 'nt':
        # for windows
        _ = system('cls')
    else:
        # for mac and linux(here, os.name is 'posix')
        _ = system('clear')


# debounce decorator taken from https://gist.github.com/walkermatt/2871026
def debounce(wait):
    """ Decorator that will postpone a functions
        execution until after wait seconds
        have elapsed since the last time it was invoked. """
    def decorator(fn):
        def debounced(*args, **kwargs):
            def call_it():
                fn(*args, **kwargs)
            try:
                debounced.t.cancel()
            except AttributeError:
                pass
            debounced.t = Timer(wait, call_it)
            debounced.t.start()
        return debounced
    return decorator


@debounce(DEBOUNCE_SECS)
def build_then_continue_process(process):
    process.send_signal(signal.SIGSTOP)
    clear()
    try:
        build()
    except Exception as e:
        print(ERR_MSG)
        print(''.join(traceback.format_exception_only(type(e), e)))
    else:
        process.send_signal(signal.SIGCONT)


class EventHandler(FileSystemEventHandler):
    def __init__(self, process):
        self.process = process

    def on_any_event(self, event):
        print('Changes detected ...')
        super().on_any_event(event)
        build_then_continue_process(self.process)


def watch():
    observer = Observer()
    p = subprocess.Popen(['node', 'scripts/start.js'])
    build_then_continue_process(p)
    handler = EventHandler(p)
    observer.schedule(handler, SRC_PATH, recursive=True)
    observer.start()
    p.wait()
    observer.stop()
    observer.join()


if __name__ == '__main__':
    watch()
