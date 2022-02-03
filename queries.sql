select team1,
       team2,
       match_winner,
       venue_name,
       city_name
from match,
     venue
where match.venue_id=venue.venue_id;

-- score card :
 -- batting:

SELECT player_name as batter,
       sum(runs_scored) as runs,
       count(*) as balls_faced,
       innings_no,
       match_id,
       count(case
                 when runs_scored = 6 then 1
                 else null
             end) as sixes,
       count(case
                 when runs_scored = 4 then 1
                 else null
             end) as fours
from ball_by_ball,
     player
where player.player_id = ball_by_ball.striker
group by match_id,
         innings_no,
         striker,player_name
order by match_id,
         innings_no,
         striker 
         
-- bowling:

SELECT player_name as bowler,
       innings_no,
       match_id,
       sum(runs_scored) as runs_given,
       count(*) as balls_bowled,
       count(case
                 when out_type <> 'run out'
                      and out_type <> 'retired hurt'
                      and out_type is not null then 1
                 ELSE NULL
             END) as wickets
FROM ball_by_ball,
     player
where player.player_id = ball_by_ball.bowler
group by match_id,
         innings_no,
         bowler,player_name
order by match_id,
         innings_no,
         bowler ;

--extras,total:

select sum(extra_runs) as extras,
       innings_no,
       match_id,
       sum(extra_runs) + sum(runs_scored) as total_score,
       count(case
                 when out_type is not NULL then 1
                 ELSE NULL
             END) as wickets
from ball_by_ball
group by match_id,
         innings_no
order by match_id,
         innings_no;

--match info:

select match1.match_id,
       team1_name,
       team2_name,
       match1.season_year,
       venue_name,
       team.team_name as toss
from
    (SELECT match_id,
            team_name as team1_name,
            season_year,
            toss_winner,
            venue_id
     from team,
          match
     where match.team1=team.team_id) as match1,

    (SELECT match_id,
            team_name as team2_name,
            season_year
     from team,
          match
     where match.team2=team.team_id) as match2,
     team,
     venue
where match1.match_id = match2.match_id
    and match1.venue_id = venue.venue_id
    and match1.toss_winner= team.team_id
order by season_year,
         match_id;

--umpires:

select umpire_name,
       role_desc,
       match_id
from umpire,
     umpire_match
where umpire.umpire_id = umpire_match.umpire_id
order by match_id --players
team1
select player_name,
       match.match_id as match_id,
       team1
from player,
     player_match,
     match
where player.player_id = player_match.player_id
    and player_match.team_id=match.team1
    and match.match_id = player_match.match_id
order by match_id,
         team1 --team2

select player_name,
       match.match_id as match_id,
       team2
from player,
     player_match,
     match
where player.player_id = player_match.player_id
    and player_match.team_id=match.team2
    and match.match_id = player_match.match_id
order by match_id,
         team2 --score comparision:

select ball_id,
       over_id,
       match_id,
       innings_no,
       sum(runs_scored) over (partition by innings_no,
                                           match_id
                              order by over_id,
                                       ball_id) as runs
from ball_by_ball
order by match_id,
         innings_no,
         over_id,
         ball_id 
         
--Match Summary:
 -- batting:
SELECT batter,
       runs,
       balls_faced,
       innings_no,
       match_id
FROM
    (SELECT player_name as batter,
            sum(runs_scored) as runs,
            count(*) as balls_faced,
            innings_no,
            match_id,
            RANK() over (partition by innings_no,
                                      match_id
                         order by sum(runs_scored) desc, count(*),
                                                         player_name) as ranks
     from ball_by_ball,
          player
     where player.player_id = ball_by_ball.striker
     group by match_id,
              innings_no,
              striker,
              player_name
     order by match_id,
              innings_no,
              striker) as a1
where balls_faced>0
    and ranks<4
order by match_id,
         innings_no,
         runs desc,
         balls_faced,
         batter
         
-- bowling:
SELECT bowler,
       innings_no,
       match_id,
       runs_given,
       balls_bowled,
       wickets
from
    (SELECT player_name as bowler,
            innings_no,
            match_id,
            sum(runs_scored) as runs_given,
            count(*) as balls_bowled,
            count(case
                      when out_type <> 'run out'
                           and out_type <> 'retired hurt'
                           and out_type is not null then 1
                      ELSE NULL
                  END) as wickets,
            RANK() over (partition by innings_no,
                                      match_id
                         order by count(case
                                            when out_type <> 'run out'
                                                 and out_type <> 'retired hurt'
                                                 and out_type is not null then 1
                                            ELSE NULL
                                        END) desc, count(*),
                                                   player_name) as ranks
     FROM ball_by_ball,
          player
     where player.player_id = ball_by_ball.bowler
     group by match_id,
              innings_no,
              bowler,
              player_name
     order by match_id,
              innings_no,
              bowler) as a1
where wickets>0
    and ranks<4
order by match_id,
         innings_no,
         wickets desc,
         runs_given,
         bowler ;



--season points table
SELECT team_name,
       season_year,
       count(*),
       count(case
                 when match_winner=team_id then 1
                 else NULL
             END) as won,
       count(case
                 when match_winner<>team_id then 1
                 else NULL
             END) as lost,

       2*count(case
                   when match_winner=team_id then 1
                   else NULL
               END) as points
from match,
     team
where team_id=team1
    or team2=team_id
group by season_year,
         team_name
order by season_year


