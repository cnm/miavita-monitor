# To easilly transfer the generated data between the ARM and the PC do the following (simulate "real-time"):
#
# In your pc:
#   nc -l -p 2999 > /tmp/received.json
#
# In the arm
#   tail -f /tmp/data/miavita.json | nc 192.168.0.1 2999
#
# To update the image simulating "real-time"
#   while 1; do tail -n 2600 /tmp/received.txt > /tmp/small.txt; python /home/workspace/mia_vita/c.py; done

import numpy as np
import matplotlib
# matplotlib.use('Agg')
import matplotlib.pyplot as plt

from operator import itemgetter
import pdb


# path = "clean_battery_disk.json"
path = "clean_transforme_mem.json"
path = "clean_transformer_disk.json"
path = "clean_transformer_wifi.json"

def read_and_order_data(path):
    f = open(path)
    packet_l = []
    skip_n_lines = 0               # Defines how many lines to skip in the start of the file
    for l in f.readlines():

        if skip_n_lines > 0:
            skip_n_lines -= 1
            continue

        try:
            s         = l.split('"')
            seq       = int(s[1].split(":")[1])
            timestamp = int(s[4][1:-1])
            channel_a = int(s[6][1:-1])
            channel_b = int(s[8][1:-1])
            channel_c = int(s[10][1:-1])
            channel_d = int(s[12][1:-2])
        except:
            continue

        packet = {"seq": seq,
                "ts":    timestamp,
                "a":     channel_a,
                "b":     channel_b,
                "c":     channel_c,
                "d":     channel_d}

        packet_l.append(packet)


    # Now to order the packet list
    ord_l = sorted(packet_l, key=itemgetter('seq'))

    return ord_l

def calculate_deltas(ord_l):

    # Let's assume the first packet is correctly time
    base_seq = ord_l[0]["seq"]
    base_ts = ord_l[0]["ts"]

    SAMPLING_RATE_IN_US = 1000000 / 50

    def calculate_difference_to_base(packet):
        delta_seq = packet["seq"] - base_seq
        correct_time = base_ts + (delta_seq * SAMPLING_RATE_IN_US)
        difference = packet["ts"] - correct_time
        packet["delta"] = difference

    map( calculate_difference_to_base , ord_l)

# Note: p_l has to ordered by seq_number
def calculate_gaps(p_l):

    first_seq = p_l[0]["seq"]
    last_seq = p_l[-1]["seq"]

    missing_l = []

    it = 0
    for seq in xrange(first_seq, last_seq):
        # Search if the sequence number has a packet
        if p_l[it]["seq"] == seq:
            it += 1
            missing_l.append((seq, 0))

        # This missing number does not have a packet
        else:
            missing_l.append((seq, 1))

    return missing_l


def draw(ord_l, gaps):

    axScatter = plt.subplot(3, 1, 1)

    number_samples=100
    axScatter.scatter([i['seq'] for i in ord_l[-number_samples:]], [i['a'] for i in ord_l[-number_samples:]], s=2, color='r', label='ch1')
    axScatter.scatter([i['seq'] for i in ord_l[-number_samples:]], [i['b'] for i in ord_l[-number_samples:]], s=2, color='c', label='ch2')
    axScatter.scatter([i['seq'] for i in ord_l[-number_samples:]], [i['c'] for i in ord_l[-number_samples:]], s=2, color='y', label='ch3')
    axScatter.scatter([i['seq'] for i in ord_l[-number_samples:]], [i['d'] for i in ord_l[-number_samples:]], s=2, color='g', label='ch4')
    plt.ylim(-1000000, 1000000)
    plt.legend()
    axScatter.set_xlabel("Sequence Packet")
    axScatter.set_ylabel("Voltage")
    plt.title("Channels Values")

    time_plot = plt.subplot(3, 1, 2)
    time_plot.scatter([i['seq'] for i in ord_l[-number_samples:]], [i['delta'] for i in ord_l[-number_samples:]], s=1, color='r', label='delta')
    time_plot.set_xlabel("Sequence Packet")
    time_plot.set_ylabel("Delta to referencial")
    ax2 = time_plot.twinx()
    ax2.scatter([i['seq'] for i in ord_l[-number_samples:]], [i['ts'] for i in ord_l[-number_samples:]], s=2, color='g', label='Timestamp')
    ax2.set_ylabel("Kernel time")
    plt.title("Timestamp deltas")

    gaps_draw = plt.subplot(3, 1, 3)
    gaps_draw.plot([i[0] for i in gaps[-number_samples:]], [i[1] for i in gaps[-number_samples:]], color='b', marker='.', label='gaps')
    gaps_draw.set_ylim(-0.5, 1.5)

    plt.draw()
    # plt.savefig("res.png")
    plt.show()

packet_l = read_and_order_data(path)
calculate_deltas(packet_l)
gaps = calculate_gaps(packet_l)
draw(packet_l, gaps)

