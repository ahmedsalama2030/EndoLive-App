import { animate, animateChild, animation, AnimationReferenceMetadata, group, keyframes, query, stagger, style, transition, trigger, useAnimation } from "@angular/animations";

//   animations
export let  fadeInAnimation = animation([animate(500, keyframes([
    style({
        offset: 0,
        opacity: '0',

    }),
    style({
        offset: .5,
        opacity: '.5',
    }),
    style({
        offset: 1,
        opacity: '1',
    })
]))]);
export let fadOutAnimation=animation([animate(10, keyframes([
  style({
    offset:0,
    opacity:'1'
  }),
   
style({
    offset: 1,
    opacity: '0',
})
]))]);


export const slideInAnimations =
    trigger('routeAnimations', [
        transition('HomePage <=> AboutPage', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%'
                })
            ]),
            query(':enter', [
                style({ left: '-100%' })
            ]),
            query(':leave', animateChild()),
            group([
                query(':leave', [
                    animate('300ms ease-out', style({ left: '100%' }))
                ]),
                query(':enter', [
                    animate('300ms ease-out', style({ left: '0%' }))
                ])
            ]),
            query(':enter', animateChild()),
        ]),
        transition('* <=> FilterPage', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%'
                })
            ]),
            query(':enter', [
                style({ left: '-100%' })
            ]),
            query(':leave', animateChild()),
            group([
                query(':leave', [
                    animate('200ms ease-out', style({ left: '100%' }))
                ]),
                query(':enter', [
                    animate('300ms ease-out', style({ left: '0%' }))
                ])
            ]),
            query(':enter', animateChild()),
        ])
    ]);

export const bounceOut = trigger('bounceOut', [
    transition(':enter', [

         animate(500)]),

    transition(':leave', [
        style({ transform: "translate3d(-2000px, 0, 0) scaleX(2)" }),

        animate(500)


    ])])

export const fadeAnimation = trigger("fadeAnimation",
    [
      transition(":enter", [useAnimation(fadeInAnimation)]),
      transition(":leave", [useAnimation(fadOutAnimation)]),
    ])

export const fadeIn2=trigger("fadeIn2",[
    transition(":enter",[
         query('*',[
            useAnimation(fadeInAnimation)
        ]),query('@fadeIn',stagger(200, animateChild()))
     ])
]);

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('HomePage <=> AboutPage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '100%' }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    transition('* <=> Page', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('200ms ease-out', style({ left: '100%' }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);

 
    
 

