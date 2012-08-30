#include <stdio.h>
#include <math.h>
#include <time.h>
#include <stdlib.h>

#define PI 3.14159265

//pseudo-random results generator for miavita

int main(void){
	
	int nodeID = 1, air_time = 0, sequence = 1, fails = 0, retries = 0;
	double sample_1 = 0, sample_2 = 0, sample_3 = 0;
	time_t timestamp = time (NULL);

	printf("{");

	for(; nodeID != 14; nodeID++){

		for(; sequence != 601; sequence++, timestamp++){
			srand(nodeID + time(NULL)/1000 + sequence * 10);

			sample_1 = sin(sequence * PI/18) * 10 + (rand() % 20)/10.0;
			sample_2 = sin(10 + sequence * PI/18) * 10 + (rand() % 20)/10.0;
			sample_3 = sin(20 + sequence * PI/18) * 10 + (rand() % 20)/10.0;

			air_time = rand() % 10;
			retries = rand() % 3;
			fails = rand() % 4;

			printf("\n\t\"%d:%d\" : {\"timestamp\" : %d, \"air_time\" : %d,\n \t\t\"sequence\" : %d, \"fails\" : %d,\n \t\t\"retries\" : %d, \"sample_1\" : %.2f,\n \t\t\"sample_2\" : %.2f, \"sample_3\" : %.2f,\n \t\t\"sample_4\" : 0, \"node_id\" : %d},\n", nodeID, sequence, timestamp, air_time, sequence, fails, retries, sample_1, sample_2, sample_3, nodeID);

		}

		sequence = 1;
		timestamp = time (NULL);
	}

	printf("}\n");

	return 0;
}
