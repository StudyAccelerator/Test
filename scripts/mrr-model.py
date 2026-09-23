# MRR cohort model behind content/business-audit/2026-09-23-partner-brief-mrr-100k-and-1m.md. Run: python3 scripts/mrr-model.py
import math
PRICE=300
# Seasonality index of NEW enrolments by calendar month (Sept = 1.0). Stated assumption, not data.
SEAS={9:1.0,10:0.8,11:0.6,12:0.4,1:1.0,2:0.7,3:0.6,4:0.5,5:0.3,6:0.1,7:0.1,8:0.5}
# Year-group mix of new enrolments by month: share that are Year 13 (rest Year 12 / pre-A-level)
Y13MIX={9:0.5,10:0.5,11:0.5,12:0.55,1:0.6,2:0.6,3:0.6,4:0.6,5:0.6,6:0.1,7:0.1,8:0.2}

def run(sept_rate, churn, months=24, summer_keep=0.5, start=(2026,9), y12_share_override=None):
    """Cohort simulation. Each new student has year group. Year 13s pay through May, then leave.
    Year 12s pay through the summer with prob summer_keep (others pause June-Aug and come back Sept as Y13).
    Monthly churn hazard 'churn' applies from month 5 onwards (4-month minimum honoured), scenarios vary it."""
    y,m=start
    cohorts=[] # dict: n, yg ('12'|'13'), age, paused
    rows=[]
    for i in range(months):
        # ageing + churn
        for c in cohorts:
            c['age']+=1
            if c['age']>4: c['n']*=(1-churn)
        # summer rules
        if m==6:
            for c in cohorts:
                if c['yg']=='13': c['n']=0
                else:
                    c['paused']=c['n']*(1-summer_keep); c['n']*=summer_keep
        if m==9:
            for c in cohorts:
                if c['yg']=='12':
                    c['n']+=c.get('paused',0); c['paused']=0; c['yg']='13'
        # new enrolments
        new=sept_rate*SEAS[m]
        if i==0: new=5  # the real September 2026 starting book
        y13=Y13MIX[m]
        cohorts.append({'n':new*y13,'yg':'13','age':0,'paused':0})
        cohorts.append({'n':new*(1-y13),'yg':'12','age':0,'paused':0})
        active=sum(c['n'] for c in cohorts)
        rows.append((y,m,active,active*PRICE,new))
        m+=1
        if m==13: m=1;y+=1
    return rows

def summarise(label,rows):
    rev=[r[3] for r in rows]
    y1=sum(rev[:12]); y2=sum(rev[12:24])
    peak=max(rows,key=lambda r:r[2]); trough=min(rows[9:12],key=lambda r:r[2])
    print(f"\n{label}")
    print(f"  Year 1 (Sep26-Aug27) revenue £{y1:,.0f} | Year 2 (Sep27-Aug28) £{y2:,.0f}")
    print(f"  Peak MRR £{peak[3]:,.0f} ({peak[2]:.0f} students) in {peak[1]}/{peak[0]} | summer 2027 low £{trough[3]:,.0f} ({trough[2]:.0f} students) in {trough[1]}/{trough[0]}")
    line=" ".join(f"{r[1]:02d}/{str(r[0])[2:]}:£{r[3]/1000:.1f}k" for r in rows)
    print("  "+line)
    return y1,y2

for label,rate,churn in [("SLOW: 4 new a month at the Sept peak, 15% monthly churn after month 4",4,0.15),
                         ("BASE: 8 new a month at the Sept peak, 8% monthly churn after month 4",8,0.08),
                         ("FAST: 15 new a month at the Sept peak, 5% monthly churn after month 4",15,0.05)]:
    summarise(label,run(rate,churn))

print("\nWhat a flat £100k needs: £8,333 MRR =",math.ceil(8333/PRICE),"students at £300 every month of the year")
print("What £1m needs at £300:",math.ceil(1e6/12/PRICE),"students paying every month; at £400:",math.ceil(1e6/12/400))
# Time cost
for n in (5,15,28,50,100,280):
    deliver=n*2.0  # hours/month per student: fortnightly call 45 min + planning/messages
    print(f"  {n:>3} students: delivery ~{deliver:.0f} h/month = {deliver/4.33:.1f} h/week (at 2 h per student per month)")
