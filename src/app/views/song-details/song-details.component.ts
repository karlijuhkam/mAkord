import { Component, OnInit } from '@angular/core';
import {SongService} from '../../core/service/song.service';
import {Song, SongRequest} from '../../core/model/song/song';
import { transpose } from 'chord-transposer';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../core/service/user.service';
import * as moment from 'moment';
import * as jsPDF from 'jspdf';
import {EditSongModalComponent} from '../../core/modals/add-song-modal/edit-song-modal/edit-song-modal.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
moment.locale('et');

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.css']
})
export class SongDetailsComponent implements OnInit {

  songId;
  activeSong: Song;
  chords;
  transposedChords;
  transposeValue = 0;
  liked;
  likeCount;
  userData;
  youtubeId;
  createDate;
  updateDate;
  songDisabled = false;
  modalRef;
  bandSongs: Song[];

  constructor(private songService: SongService,
              private userService: UserService,
              private toastr: ToastrService,
              private modalService: BsModalService) {
      this.userService.currentUser.subscribe(currentUser => {
          this.userData = currentUser;
      });
  }

  ngOnInit() {
    this.userService.currentUser.next(this.userData);
    this.songId = parseInt(window.location.pathname.split('/')[2], 10);
    if (this.userService.isAdmin() || this.userService.isModerator()) {
        this.songService.getAnySongById(this.songId).subscribe(
            data => {
                this.activeSong = data;
                this.chords = data.content;
                this.transposedChords = data.content;
                this.likeCount = data.likeCount;
                if (this.activeSong.youtubeUrl != null) {
                    const youtubeSplit = this.activeSong.youtubeUrl.split('=')[1];
                    if (youtubeSplit != null) {
                        this.youtubeId = youtubeSplit.substr(0, 11);
                    } else {
                        this.youtubeId = null;
                    }
                }
                this.setDates();
                this.songService.getSongsByBand(this.activeSong.band.id).subscribe(
                    res => this.bandSongs = res
                );
            }
        );
        if (this.userData) {
            this.songService.checkIfLiked(this.songId).subscribe(
                data => {
                    this.liked = data.liked;
                }
            );
        }
    } else {
        this.songService.getActiveSongById(this.songId).subscribe(
            data => {
                this.activeSong = data;
                this.chords = data.content;
                this.transposedChords = data.content;
                this.likeCount = data.likeCount;
                if (this.activeSong.youtubeUrl != null) {
                    const youtubeSplit = this.activeSong.youtubeUrl.split('=')[1];
                    if (youtubeSplit != null) {
                        this.youtubeId = youtubeSplit.substr(0, 11);
                    } else {
                        this.youtubeId = null;
                    }
                }
                this.setDates();
                this.songService.getSongsByBand(this.activeSong.band.id).subscribe(
                    res => this.bandSongs = res
                );
            }, (err) => {
                this.songDisabled = true;
            }
        );
        if (this.userData) {
            this.songService.checkIfLiked(this.songId).subscribe(
                data => {
                    this.liked = data.liked;
                }
            );
        }
    }
  }

  loadSong(id) {
      this.songService.getActiveSongById(id).subscribe(
          data => {
              this.activeSong = data;
              this.songId = data.id;
              this.chords = data.content;
              this.transposedChords = data.content;
              this.likeCount = data.likeCount;
              if (this.activeSong.youtubeUrl != null) {
                  const youtubeSplit = this.activeSong.youtubeUrl.split('=')[1];
                  if (youtubeSplit != null) {
                      this.youtubeId = youtubeSplit.substr(0, 11);
                  } else {
                      this.youtubeId = null;
                  }
              }
              this.setDates();
          }, (err) => {
              this.songDisabled = true;
          }
      );
      if (this.userData) {
          this.songService.checkIfLiked(id).subscribe(
              data => {
                  this.liked = data.liked;
              }
          );
      }
  }

  generatePdf() {
    const doc = new jsPDF();
    const imgData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWkAAABJCAYAAAD/oNfMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAACStSURBVHhe7d0Fdyy50Qbg798lWQpumJmZmZkZN8zJhplhw8zMzMxJf+eZM7VXVy7NdE+37bGv3nN0bI9b0FLpVVWppPm/oaOjo6Njb9FJuqOjo2OP0Um6o6OjY4/RSbqjo6Njj9FJuqOjo2OP0Um6o6OjY4/RSbqjo6Njj9FJuqOjo2OPcapI+le/+tXwk5/8ZPjPf/6z/mQ7fv7zn6/Sf//73/Un4/CnP/1p+MEPfjD84x//WH8yDt/61reGH/7wh5Pa+LWvfW346U9/OrmN+uIb3/jG8M9//nP9SUdHx0nDqSFpBP2c5zxnePKTnzy89rWvHT73uc8Nf/nLX9b/zfGjH/1oePrTnz487WlPG17/+tcPX/rSl4a///3v6/+24ZlXvvKVw+Mf//jhZS972XDZZZcNv/nNb9b/bePzn//8cMtb3nK4/e1vPzzlKU8ZPvaxjw1/+9vf1v/N8dGPfnS4yU1uMtz5zncenvGMZwyf+cxnRi0MP/vZz4Z73OMew81udrPhMY95zPDOd75z+N3vfrf+b0dHx0nBqSBp5PP85z9/eNjDHjY84hGPWP181KMeNTzpSU8a3vWud6WaJO0Z6T384Q8/Kw/y/OAHP9jUWhH0pZdeelZdfiJsi8Pvf//79ZNngzZ861vferjmNa+5Ste4xjWG6173usNtbnOb4Q1veMP6qbPxqU99akWyF1988SrJc73rXW9F8u95z3vWTx3Er3/96+F+97vf6vmo69rXvvZw05vedHjuc587/PWvf10/2TEGLJJvfvObw7e//e3JllPHcvjFL36xGgdpmwJ23MAv0da58+3Ek/Qf//jHlTaLbJFsJMRJg/zsZz+7fvIMaL1Ivc7j7yc84QnDV77ylfWTZ+Pf//738La3vW1V9iMf+cjL8/kdWSPOf/3rX+unz+B73/vecKc73WlFtNe5znUuT8jzFre4RdrGr371q8OtbnWrFcmWea5+9asPt7vd7VZujAwWLO1RdplPORaFt771rZPdJuc6jO1FF1206tPvfOc76087jhrPetazVuMgffrTn15/up9gnWvnla985ZUFPQcnmqRpta95zWsOkG0Q6Cc/+cn1k2eA1F/60pderjlHQryPfexjhy9+8YvrJ8/G//73v+F973tfStDqf8tb3rIi8Rp8yfe+971T0rzxjW+ctvG73/3ucJe73OUAqfsbcX/5y19eP3k29McTn/jEVdk058jn92td61orl07HdBhn42eRMzYdxwNWoHGQMsVmn/DMZz5z1U5z9gtf+ML6091wYkma2clNUJNtEOgHPvCB9ZNnwOzgS87y0LozwgSaJ9+w50qClhA090fmy6axP+ABDzhA0Ajzhje84fD+979//eQZ/PjHPx7udre7HSBoebg+uEAy6A+aRl1XkPWLX/ziU6lB63fjxkXl52GYwcZZv3aSPl6MJWmK2Ic//OHVM9m8PAqc8yRNY333u9+9IsiSNP3uM5tktdvBYL3pTW9KCVr60Ic+1CQxm3W07JqglcXV8uc//3n95BmI/njc4x53gDSRLb+yttRA6g960IMO5KEZI3WafAb98fKXv3xVdq1BExLkfVzCetjg6+cCYlpe9apXXS2mS8NYG5NO0seLMSTN3cdlSR7Iv32nzAV52DjnSZqWXLsdJASN/Gq3g3C3t7/97QdIPfLwJbcImn+alq2+Ot8LX/jCFRnXQIg2IA1STZqI1AYj90kJq79yEU48LwWpW3ha4MaoCVoiINwfp3mzyxjoM+9+tatdbdXvU8Ibx8C4dJI+fowh6Xe84x0rPzB5IP83uMENVgv5UeOcJulPfOITl2u/JWnSavmna40R+SJ1pFo+L/nszW9+c3NSi2lGcjVBq+t5z3veKoqihgXCpqTBKQmT0NCIL7nkkgMErc0iUQxqnQf5vu51r1s/eRAsCuRRE7SytDtbRE4LvJvoGP0q6SsRLKIAloQx15+dpI8XY0j6jW984+VaNJm4/vWvP3vjbhecsyQt9plWmxE0cz9zO4hFbpE6X3IrTlkMNa0s06CZUOKQayB7Pm/CkZFm5nYQHhjCVz4vvwG2ydlaRLhouEGQU5mXZskXni0ipwn8johTP/Hj+10/0qaWhHFXbifp48UYkhZJ5UxBuL8e+tCHbj2LcBg4J0ma2yHzC4fbgbughk02z2QEjUxbg4eAhdDUBO3vpz71qasTgxm4HZBrRtA05bo+Wv6LXvSiJqnTyFunBb3bjW50owMETSjuec97ruI0TzNYLMaEaXvb2952RdjcQvrtPve5z6IuD/Uot5P08WIMSYOTwBSpV7ziFcd2gOucI2kTA8llbgcD98tf/nL95BkgdQdMMoJGjK1DJzbvXvCCFxxwj/hbeYLTM/BrM61qsqXVWs2z+pC6Z8o8fpfH5kdrEfFuYeZHPolQiMc+F2J5uaKc3kTS+uoPf/jDSpvWB1we4syXgvFXbifp48VYkt4HnFMkbVWk1Wak2XI7OOjRInXaKSLOYKLTyuu6lEOLb018bgdabU2a4XZwZL2GjUyTPnNVcOlklgEgpzvc4Q4rASjzEQYnGluHXE4bbL4yZ/V5uDe4hnwmGcelQAY6SR8/OknvIZjsz372s1O3A38x/1ON73//+yuXRJYHqTtckoE/+1WvetUBgqaJI+hWfLKTTze/+c0PELTBuetd77qKe65hI9NBlkwTbpE68JPf/e53X5Vd5lOONuz7KaylwMLg0hHNwdURlpRDPnz0Fjr3lrQW46kgB52kjx+dpPcMv/3tb1eRELTfkjSRrYiLr3/96+snz8Cuvs25Og/iRdwIPMOmgzGS2Ns6IgNorbTXmjQNDm03c40QLhcmZQSNWDJSB0SEwBFQmU85tHja/LkCG8gsEH1mXAMOK3EtIW9jIhJoCZAFdXWSPl50kt4jCK16yUtekpImrdZtdTVEMgiLa5E6N0EGG1Dus5Cv9F8HQb/3ve9dP3k2+H3tIhuImjQd3c7u/9Bu/6tJ3d98yS0C4IZBPnVd/Nc2y1widS6B+ysmq4NGJYQrGgOLmXFfAuRBXZ2kjxedpPcEQtTEO2cE7efHP/7x9ZNnwFXh2HPmS+bfbd3HIQKgFUOtfvdxZKeVaOzM7ZpsaXe02kyD45q54x3veCAPQnHJUsvfzbRvxVBLm2KoTyMsxm4BpC2zVmrfvT0Mlop+9jPbVJ4K8tBJ+vjRSXoPwO0gGD0jaOkjH/nIAbdD+JKzPAi61rRKCNuKssu8yuL+yMLfkETmdkDQ/KHukKjhqkv+6ZpoEbT7OFoCZ8GKwa4jQOQVYjQl1MyCw42EaFgCrt4UTmgh2OVeD+UJcYryJC4l92csGQJXwslLfW1z0EZhBuOpzzznsM9ckAnlHTdJk0d9W/a35G/WlnHM3HJLguVpzyTqpnyoe2y9niPXFB3yV74H2dx0OvaoSXpTW8l9KzwWTiVJIwkRD/WGn0TTzY5u6ySaZLbZpxwHWVqwyRbPlnkRdCuGmhtGuTq/JFtkgDgztwOBvv/9738gD5J1ZNUXBmQgICIUPFcTtLJEqcTxd9qkxU27LTw1QfLV6j8aOQtA/oiCEDb46Ec/enUHydjYav3OB+4LFuKGvyhP+4yHL2DQx0seSVcWd9dVrnKVVZhd5lICewg0bQup8do0mcaAXHjHOSRtr0HIJSuRUjG2HGPJOpBPCKi+9V7eL5K/73vf+67G8dWvfvXqGPQu91XoN/nNKYRZwtxzgRVXEzdfjDfZV/c2IiKrTv6RUWPIGpK/fA+yKZzSdcBZ1NZYkrZfpb+8CwVpKrTVvgclSFtdDVy2VX/f6173WrnTcFY2b04dSRMAN8KZUCVp+h1p8hkHIQUIr89bBM2X3Frd+YZ1vufKvOriC8/C36yoLbcDQc2uAUXqyqzzeN7Plpan3SZKkH/kC4IW2aI9Adqw/1/hCldYXdBUkhIic7iDsFx44YWrk1hITgrB89PfhJGm2uo3sFmqDm1RVlmepLz43QLAmskm3C5AbKJitPfBD37wWX1QgrXDFWIycSXNDUskG/p9V5L2/r6E4YILLhjOP//81eSmfW6CMaCxIWb7GDFGcZIu+ljyt3jx+J11pn+M/aaxrEFWtU855R6O+WCD1v6H+qOuqM97ZReGBWih5hpXYNnWOvlcIqtkkbuxHOOxJG3uaOd55523UVHLYLMfp7CKx7bVgmNhKdt6qkiaEHFjmAgZaXI71FotwkZwNalLOljcbEuToGVYreu65KOd1hoE6HyhgDq8Jk1E6kh6vYggaBPMQJV5PG+y03xbE4jAeybIPJKy3KxXLyJC82iWhMd7xbtbqEwMn8fq793jK8MsOgg8wta8n5/ep7ZatJUghvAqEwEaI2VJytWPEcctIe1Nm6JTQDNSHutCnPQmOJAUCwbNdQ7Ih3fZhaQtGBa1aLfN7W3WBXn3riwt4yF5D+TLKkPy0ecSi8YiIAwzxloyVlxCY78ZxILqPckaYgVhjNofhGXMzbmom7LjM4Raw5wwTvYGtCfkAQE/5CEPWRG/MsgNWXzgAx+4ipZSj+c9yzoIeR9L0uaWuaOM1vXDNcwZckIJKNuKgG3aZ221eJZt1RfmPZwqkuYzJhw12Zr8TPDsfmAmvcHL8tBoW5OgFUONWHRqpvEhJ4JOcGuCNjhC/ur6aLLKyzRhg5aReoBFYXKV+SQDzheeLSI1SSubO4Ima3IJ7VMuP1pNvk5CGgP51IFItJEZV4LVQpMijNqHBGlb9QJqQWPaW2gikkU/meitU55joE99EYI2WnhaoYoBkxPJeZ4ZPeeeaTKinKkkjeDIpDHQB1xA2wgTIZFt/RZ9Z9HjJmARZBo4GdW3xkO/i6U3TpEfeYx5/5KkafFgUSdXykJSyLu01MiTPqnPLJgTFBvlyas99mUs9Cy/uh+8A4JTDsInO9qOBLULLHDKk5YkaTLrDIXno6360Bwwt2oZj7Z6bxe0WaSirfoL4m535Z1oknb4gGaYkaZojWxSt3zJ8hDk1iQwqRGnSVPnI3zZfRwGI7uPw+/IzICUJg4QWsfODU6dh+CYqK1NNVEhEZkQ+SR/03hbB3FKkibQ+lU5hI2Wtc20BhOPq0d9BI5GE32izxGe8k2esbeKmejxDTPakrmExsKkRJIE37htg0lkosVE4WPcFepTzhSStiCSa30mL+WgJLcMCJo8Rh6LoQV96uLm3WmFxsy7K4/2t02DL0maH5yPOvZEEGe9wLdASYgrZJVncd90FUMGezn6zJwhOxafuF1SmUuRNA2awhFtpdiYB2PmTMDGov7VV8qh0Jjn2iqdWJLm+/FihLImTS+YnboTSreJ1FsdqyymUk3QykG0rRhq/lkCZsBL0jSYFon68hbki4g8XxK0ZLAQZmsR8W7ZwRh/C91rHcSBIGkCgsz5Iwk2szjbAG2BwMY92PKbWIiDKc3H53Rf66u7WkCOyEaZzNwpwl8iNB1aKUtqDFhi6pWYqbuCrChjLEkjI7KlrfIZh9pFVQMBliYy18bY92yBu8tirUwyibw2IUgaUSEWLgkEvy1fDfWSf2WRS5vWFJ6psKiQQeW4q4ZFFOUuRdLmuDI9q8+zb0saA/MsyN48Yb0q98SSNK0WGWQEbTJlGiMzi4+3JmjEi4BbR4BNDgPNr1TmUw7Czw7GAD85crE6lqRJQOxm8zXWaN3HIQ9Sb01UEx+BZQRNOLddWh4kra3ql49pucuxaDvj/HLKsGiwTvzOxbApnHETvLs+0L5dvjmFPEREgZ/ZAp7Bwhb9oR93vRmQvGj/GJK2CJNT5GbC+n2Mq4F7Sv9INOC5BB3wbT5IVx8Y1/A1ZwiSVr8FLtrfsvwy6HMXXymHDCPoOaA4aBdXgvKWJGljyY8fY7srQQdYSmTd2Edb9fuJI2l+XxpDRtDMG2ZWDZ/RQrM8fD/MjQxiqJmLtQatI/n9WmY7Msru1tDhVvPMdy0+OiNoeWwytEw9LoVWDDVf15gBLkla/YRjzj0eLBztVlYIO+tmVwgz9H4S19JU0HbkRdL8kmPB7Db28nqP2s8+FmRGGdtIGkFb+LVT/9GgW5ZTCdaFxUc/S0K/loQ5olzWUfhMMwRJe0+bvRbmbD62QFsu65ojMyUs0hQG8r0USWsrWYy20oKXgLlokYq2njiS5h4wyWqypdVasbO7LoLUaw1aGYhbp2SwArdiqKWWRkdrbbkd7PRmk9TlS0GSZR7C1CJ1oOlGeFyZj4DRfsaGD5UkrSwbjNv8j5vAXCW8hExbLFiZz34saLDeR5kiTKa0zTgaNxOJhjf1Pg6x60hTsoG2zS+cQf3bSFo7bZSFBi3PNhdHwCJk7NShf7Ivr5gD2i3CVT4CaWnTQdLGneaKcMf6ocH8pZkaK3OltYeyC/jY9e1SJG2emzPayp3YUvR2ASsk2nqiSDrcDplfmPaR+Tq5FAh+Ruq0lNiBrmEi2nXNNGh5HQXPhE95/Ek1aZpANsyyS534kglmncfftJHWImLB4jsmSGW+IOjWl85mKEma0Hn3OUBEyiJkyuOCmmLy1mDuW4ymuivA4qBfTEwbgVOjNBCFcdDPiKq1/7AJZEf9LZK26JThYeR17CYZX6bn9Y28S5yQrEHWabXGUj2UlwxB0sbegti6+bEFFoDy1bO0NWDusSzNK22cS9I2B7XVM8Idl4T4dP5t/XhiSLp1DWhox5mvE4kh9SwPUm+dNiOQtCfPIeUyL9KmtWThb4iOsz8jaB2etdGEb/mSkX3Ll2z33TsQtjIfwUKMdtKnbLQESauX1jv3wnsaPk1IeSbc3K+jomVaVGkX+iW7YrYFk0k/SfzjU6EfudG8h7TLhCQ76s9ImrxFJINE5uoN5U3gTkCI8lpMdjkhNwYIVz36wJzKNpSDpCUuuCnRGKKcWI3ew3zJFJo54BJiZShf++aQtIXegu//iD+z4OdAv5WRRXtP0iaoiIeabEOrzY5F8+NZibM8fMmbwqlsuHiuJmhlGbzM3KXZcRHo1JI0Q6PIXCM0vBiIMo9BoVm3/N3q5wvzHEKOfH5Xn8Vs6k54kLQJqE1zTTeLKj+68kQHtC6oGgtauOgMJM3cHjspTEzEpY8R5BT/aAkyJkpHnwsJnBLxAuQn2lCSNNm2cCCEIL8pBA32MuSVuPwOC1xO3l093HnZpnKQNPJi5U2BsSHD8iLTOZZXC+a09mvjHJJmMZtr/i9yaYpLZyzKK3P3mqQRUuvotp98n3UHWZGdUspcFYSoddcF8FeW5UdSvzIzU9mqF5tLJdkaZARN866BBAmiAajz0GRbbdQfNigygpbX/0z8qQiSZr45NEJTnwP9FOFX/HXbDo5sg0WHO0B53EZjSVrEg/4xmSzo2QI7Bt7HgZAYr6lmPBmqSZrc2pQOMvDMLuGFLAX5lWOuHBa0N0Iz1Zf5pYOk9dNUdwX3nHwSC/gwsNSJQ5Z2tLV1SddclOGUe0vShKJ1HwfSJJD1pENQduAzUlcOQWit0K0YagQshjrbxDF5Iy44CFMywH7y3dWLCE1JHVmeFqmDclz6gpBrglaWdoyJBMhQkrS+m7NpCCVJ+97Audd97kLSxlmfeCf55vrZgwwl7o8pIEfGCEmHqwYR+BvpsTqm+NlLhNvLPsScAzdjwOUUmmi2ARskTZanhgCyABESDZXydRhYiqRt7GmrZ+xPHQZOBEmLM64JWvIZ8qsJ2kS2aYJksjzIuybMgEmfEbSyaKeZCWpBiKObmVZrha3dDshLPQY/no88fm66ZIafOcou8xJqbd2VoCFIGpnpg101zsA+kLR34i9EKjYb5/pquaciwoR1MCXywPiQE/lFSlgwjJ22uUtjTv+UR91bG+FLgXaMNNSXhSMGSZPTsadKA1w18pLnOeGfm7AUSXOZxnse1sK49yStAwl2Tba02uzotknM75sRtM8uvfTSphuAZtM6GNOKoaalIWEdWBKmQSNkIkpqjR3x8avq+DoPgdhkHlqtTfCaoJWFDLP7OKbgNJK0zUokaIyQqg0/cmB/Y2qSz/io2/jq9ymboeRJHmNINiKcjTzP7Zs4+MH3v+thm7FwWVm8/yaSJptTbw50wAspkvGlNw0DS5F0bHCau7tE+4zBXpO0E3wttwNfVeZ24CNsXZjEjEIaGcQf24Sr6/I34s58qbRxE9cgGqSSNA1cdnTbAsFlosPLPH73mTsFWouIb5LJDsYYQMKyRHzmaSNpz0f8uD7Wd/KK3d01ya8c5RlncjLWLeTZIC8urSAKpDbHAgL9oSwk3YqnXwoWq7EkPVWrL0l62wnZXXEYJD1GYdgFe0vSm9wOrWtAvUBG0PLQdlsEzQdIU0bkZT51I9osnhX4wglhSbaSDtWOrD5aWEbq8tCuW5Pdu5l88pb5DBwzd+6GXOC0kbRJHpaHySTfUimIX7THpiPSJciVsUbQDhjpG39rG3mfs1G7r5r02L4JdJI+G3tJ0nx+NmRqgkaiyDTTEnSQY6pZHr7k1t0TIjLEptYuDuWYNC0hsRliotVka8Bs/mT1tUhdHqTeOh3m3cQaZxq0WOG5F9GXOG0kbexjMrKUuMKM3dyEYENDV/bYuGuy5XkbheScgiCmngzY2KQU7ErUcfc2a8s4HiZYpUHSrgyt0Ul6OewdSduEoVFmfmFuh0z4mFOZLxlB8/u1dsuRop36jKAJWatDuB0QWUaavgIqW0RcDpP5kg2wdrZ8yTaXxPcaoDKfusVQT71JbhtOE0kbd3XGJJpKFtuArI2ncTdGY2KmyZfnyxA8fR5x8nznNs52Oc5NOVAG5WFpuahBidKv6svCROeQdPQRGc+IcQk4NakOaQ5Jm7vKIF+7Xhq2DbF/tRckbVKZgBlpCvnJJiQz30t4ps5DkFoaBfJo3cfhZ/ZN4iA8Ly49KUlTB7auASXEm0i95UtG9rQ1z5X5lMOk3RTnvStOE0kjUZMH8XmXuT7fGmKZ424WC/CYu0DIlvEsSRoc4KCV+Z/2sgqnErV+QSbKFhd+WLAXU8ZJZ5bcHJKOPRtyfhhH24GVrP3aOIekL7nkklUZnply/cIUkBn1HztJE3harZUpCFMyuWgWmWbQInV/MxtbwuEot9CnjKDV5+RWFqKnvPIgQyR/cztkbbT5KfwrI2i+5IzUgWbtpFEIeiTlIITDih89LSQtoiaOcOvDubHRLbjkSx1cFay2bSBn2lOTNHB/uBrAhFSmGwSnELWDFfG+9m0OC8bQWKrLta2bThyS2akkXV4SZayXhvnP6tDP6phD0lyY5r+EsJeGIIJw/xwrSRNEG2o1QSNNg511onhlvuQsD1Jv+bJMXsIsX7nB6HdJOBUiqEHTyY5uE6bW0W3hQyZdlsfnLYLhk+SjNjBlPlqhyZ19B9xSOC0kzQqJ6AlEstTGag1xvMZFPWKwt23YkTXPZiQNCI1F5hkkWH7X3TbQaMmJfCb2LqcWxwBZ2Sy1MNH4MxmZQ9LGNEiazMyVwRpkQR8jPXXMIWk8oxz/d3K4FZm1K2LhjoXgWEhaNIOd4oxs/WSy1mC2tu52Jhwt3xDtuHUwhlZtQLLoCpqCc/khdJEIksv8M9OSINCUdWydx6UxLcFwlD02Csp8BAUZeO/WQZwlcFpIOjQc/WisDwuUBS4pk1RihW0CWdOmFkmDdyo1aq6+MUTtGffGyKP8wzoIYjNW/2tf69DVHJKmtFlY5SeLrS/T2BXGyHyS1DGHpIUBk0PlUNbmXkhWg8WMM7ThWEjaqmMy1WQrIQhHwWtCsjnTuo/Dz5YvGfyvfDYSgnbAISNo0R/+b5Bq0qRNZD4zPma+5hDSSDrbznvrbmdmWHz3GkKOfH73Gcshu3VvSZwGktZH4d/V57t8g8sUMHMRo/rI06ZF1P89t4mkwXvZd/CssseG57kuIMidlru0vLAUuO/UwR/fctfNIWkwD2jq0pJuBHOclap/wgKaQ9LkkZsr2sqfvhRwnTkYbT1ykvZyCE4jSsKUkGJ2dJvAWblrX3Lk2aTFeLkshhrZt2KodRJzU+cEYQZpGrjMz0mzsqkSAhrJ8ybmpvP9XD5IpSRoSVnuYV7alMpwGkjaWFsMjRtCaYVfLgXaU9RnjPVhC2TOeG4jaYj7xT0/lqjt04SLDbEsvZmFkJQrbfpmm7kk7VBayL6N+qWOuVPUzEVpCZIGSleQKJlsLVxTweoPLfrISdpEa7kdkCb3R00OfMnZfRx+95nNhpYGw2/ET10vCOqySmd33ao/czvoLB2XHd1GSKVwRopObvmS9QfC94xU5iUc2p4tIoeB00DSTqMiNckYynOYIHcsJ5OIbNBmWyB35GMMSYPNaAuAPN5njOuDIuN57bGhvSRpsB6VjTg3nWqcS9Lcfua1dzYH/N466DUWrAChksbIe5hr2jiXpLlfyXi01RjPnTdCkZ2NUHe09UhJ2mrW0mq5MupQKZOABpqRusHjMmkNIAEh2DVBy2eyZzHUOhh565SSNKOjkEA9CMhINIFBr/NIwv3qOzwCNiuzGGplaXe2iBwWTjpJl7HR+vCw/LI1WH7qlPioW4sq2TOuY0ka7LGE64NJjQA3ETWCC9KQx2GZsXW1ILwQMXs/bd92X8lckgYb72QRqZp3XCDebRdwQRqXCy+8cBU141yFcrVxLkmDLw6xmEZbuSZ3XVQsftx12qqd+CvKPRKStgnAhZARdOsaUALSInW+5NbAue2MmwAhl/n87fOWWapMwlWSrWSgEHFdH/IlQEHI8bzfCQHCb7kqxDob3IygN8VQHxZOOklbzPWdsdJ/cy+cGgu78PGN8KJKWosD+dO+KSQNTOq4jAn58jdvImqXhdHE9IM8NEiy1lIUWjD+CJlMRFlkfZtcLEHS4I4QC5N+NUdYRlPjx7mjRF5cdNFFq/cwVuak9klLkDSwoKKt5j7XUGuxboHlZFHVVq4uAQjkXTuPhKStjIQrI02dlvkOXf9nwGtNGEG7y7UlqEwbneS5Mp9yxFC3vnaJS4Jg1aSpg7SjFhBavoiLGJh43u8+sxi0BJqGZCA8V9ZlQAwUYTpqnGSS9j9tjsm35CbONliEaWgI1ETlr83cLGRQ26aSNFBWLARkUR2OuW8aH35coWaeVSeZpCAhJXsnLcVBmb4T1Iar/RXyiaT8NKfGaIhLkbS6nA5Uv/dWpnfSNhZmtjFqISJ33t9BN32G9Cxy8SUNQXzSUiRNeXNtBRmItgrLtMAKh9zUVn1kPKOtFLdo15EdC9/lGlAr4CZSz+52Bp8LE6oJmibOv9u6/tAmS2hDNWkSVoJbwiSM+4AzTVhdrUWEn5y/UMeX+dTt8zmCPQcnmaRpHbRYfWpCLnmnyRjYM1G3MWx9rRQ5JBu7kDQI9wwf9RiiFt9PdrVLkg+JCA+1qNBU7QFJCMleizlHBvVxPK9fuezGbl4vRdLg/Wzu6zNleg9tYh14f+2Kd/A+PvOtQsYhFk3fs1haN4dB0mBR4Q7V1ujz6G8Km1szy7ayzB2sieck86S8m/pISBoBawxhKV0WyNbnmcZIuJCcCV7nQeqtyY4UaNhevNS+/U6LaF3MbQD5hXVSqRHrGFptdkiBaR0DGM9LOtS7tnzJ3DBOLrr2sq6L32/uQMyBsbBRcaUrXWn1Drv61QLGQ4z5Fa94xdU7z3XfIGlCqzxkVRKxiUwLkUyK1kbyYcEigZzVf/7556ffrOMUKV8jmdk1YsEGHtIkP+edd96KbDM3YcAeD2WCX5u8BXGV169GQsza76fnzAlzkJtySn+ap95TGUvcs2zckaQDZeZcvIN21u+gXu+gj7WfVVO7vciQ56RNX4GGVNVxwQUXNENna2irfTcLw9i24gxjSrmseQNHxnNzv1igSdII1QVDnOlWWIJqEAlXS1ARGV8Y/xeSjTzMF5OhBZorU8iEpRFEPmVsGgyOf6YcQibIscrqaAtGBu4KqyNCsGpHHqe9sg3JgPZrH/IyMIQJQdNgN7XxKED708cWNAI6N84WyfPVGXfuh7mn4EwAAf7KYwZHhAENz16CMDWL+2HcazIGtDptIHtZNA8NSvtYlXOsCiSgHJtK+mJMLDgid9pWPhtTFhTEUSaEggh9Sww5YKnsIgM0UPVwLW47hTkFFn0H3FjJ3oHli+zq9lPS8E2rbnykfdImi8Z81Meem2oRcI0KC8ZBeKVuq3nvc201N1oKTIwZmWpx0Vhs9Ulb0a2qdsKtZIhxG7wo9wRNgAY9VvtgItEKabsm86b45BJcGjQVk4jZMcZkJggO3picNqvGdqQFhallIWK6HdYFLR0dJZAuOUc6SKRMCNDiMXVz7qhh8fcOrE5zu25/HSF2nOCrprSVbfUTz/h86jfOz8FWkg4wmzScVjQWkWcq1GFAp+5qE2Sr9hTQ5nYRDu+mrqM2zzs6Os4tjCbpjo6Ojo6jRyfpjo6Ojj1GJ+mOjo6OPUYn6Y6Ojo49Rifpjo6Ojj1GJ+mOjo6OPUYn6Y6Ojo49Rifpjo6Ojj1GJ+mOjo6OPUYn6Y6Ojo49Rifpjo6Ojj1GJ+mOjo6OvcUw/D+182rOzTJB/AAAAABJRU5ErkJggg==';
    const songTitle = this.activeSong.band.name + ' - ' + this.activeSong.name;
    const songContent = this.transposedChords;
    doc.addImage(imgData, 'PNG', 3, 3, 48, 8);
    doc.setFontSize(20);
    doc.setFontType('bold');
    doc.setFont('helvetica');
    doc.text(songTitle, doc.internal.pageSize.getWidth() / 2, 23, null, null, 'center');
    doc.setFontType('normal');
    doc.setFont('helvetica');
    doc.setFontSize(13);
    doc.text(songContent, 25, 35, null, null, 'left');
    doc.save(songTitle.replace(/\./g, ''));
  }

  setDates() {
      if (this.lessThan24HoursAgo(new Date(this.activeSong.createTime))) {
          this.createDate = moment(this.activeSong.createTime).fromNow();
      } else {
          this.createDate = moment(this.activeSong.createTime).format('LL');
      }
      if (this.lessThan24HoursAgo(new Date(this.activeSong.updateTime))) {
          this.updateDate = moment(this.activeSong.updateTime).fromNow();
      } else {
          this.updateDate = moment(this.activeSong.updateTime).format('LL');
      }
  }

    lessThan24HoursAgo(date) {
        const day = 1000 * 86400;
        const aDayAgo = Date.now() - day;
        return date > aDayAgo;
    }

  transposeUp() {
      this.transposedChords = transpose(this.transposedChords).up(1).toString();
      if (this.transposeValue === 11) {
          this.transposeValue = 0;
      } else {
          this.transposeValue++;
      }
  }

  transposeDown() {
      this.transposedChords = transpose(this.transposedChords).down(1).toString();
      if (this.transposeValue === -11) {
          this.transposeValue = 0;
      } else {
          this.transposeValue--;
      }
  }

  resetTranspose() {
      this.transposedChords = this.activeSong.content;
      this.transposeValue = 0;
  }

  likeUnlike() {
      this.songService.likeUnlikeSong(this.songId).subscribe(
          () => {
              if (this.liked) {
                  this.toastr.success('Laul lemmikutest eemaldatud!');
                  this.likeCount--;
              } else {
                  this.toastr.success('Laul lisatud lemmikutesse!');
                  this.likeCount++;
              }
              this.liked = !this.liked;
          }
      );
  }

  openEditSongModal() {
      const initialState = {
          songId: this.songId
      };
      this.modalRef = this.modalService.show(EditSongModalComponent, { class: 'addSongModal', initialState});
      this.modalRef.content.refresh.subscribe(($event) => {
          this.refreshSong();
      });
  }

  makeSongActive() {
      const request: SongRequest = {};

      request.status = 'active';

      this.songService.patchSong(request, this.songId, 'Laul muudetud aktiivseks!').subscribe(
        data => {
            this.refreshSong();
        }
      );
  }

  refreshSong() {
      this.songService.getAnySongById(this.songId).subscribe(
          data => {
              this.activeSong = data;
              this.chords = data.content;
              this.transposedChords = data.content;
              this.likeCount = data.likeCount;
              if (this.activeSong.youtubeUrl != null) {
                  const youtubeSplit = this.activeSong.youtubeUrl.split('=')[1];
                  if (youtubeSplit != null) {
                      this.youtubeId = youtubeSplit.substr(0, 11);
                  } else {
                      this.youtubeId = null;
                  }
              }
              this.setDates();
          }
      );
      if (this.userData) {
          this.songService.checkIfLiked(this.songId).subscribe(
              data => {
                  this.liked = data.liked;
              }
          );
      }
  }

}
