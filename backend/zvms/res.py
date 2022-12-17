from enum import IntFlag

class AUTH(IntFlag):
    NONE    = 0b0000001
    STUDENT = 0b0000010
    TEACHER = 0b0000100
    CLASS   = 0b0001000
    MANAGER = 0b0010000
    AUDITOR = 0b0100000
    SYSTEM  = 0b1000000