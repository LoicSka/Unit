def sim_pearson(prefs,p1,p2):
    # Get the list of mutually rated items
	si={}
	for item in prefs[p1]:
		if item in prefs[p2]: si[item]=1
	# Find the number of elements
	n = len(si)

	# If they are no ratings in common, return 0
	if n==0: return 0
	# Add up all preferences
	floats1= {k: float(v) for k,v in  prefs[p1].items()}
	floats2= {k: float(v) for k,v in  prefs[p2].items()}
	sum1 = sum([floats1[item] for item in si])
	sum2 = sum([floats2[item] for item in si])

	# Sum up the squares
	sum1Sq=sum([pow(floats1[it],2) for it in si])
	sum2Sq=sum([pow(floats2[it],2) for it in si])

	# Sum up the products
	pSum=sum([floats1[it]*floats2[it] for it in si])

	# Calculate Pearson score
	num=pSum-(sum1*sum2/n)
	den=sqrt((sum1Sq-pow(sum1,2)/n)*(sum2Sq-pow(sum2,2)/n))
	if den==0: return 0
	r=num/den

	return r
