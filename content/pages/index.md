---
title: Home
slug: /
sections:
  # Presentation
  - type: GenericSection
    title:
      # Text principal
      text: Remédier à l’hypoglycémie, protéger votre relation au sucre
      color: text-dark
      type: TitleBlock
    # Sous titre
    subtitle: Une solution de resucrage avec son distributeur
    # Texte
    text: >
      Complément alimentaire pour personnes sujettes aux hypoglycémies avec son distributeur adapté
    # Media
    media:
      url: /images/dispenser.png
      altText: Distributeur de solution de resucrage by Hypocaps
      elementId: ''
      type: ImageBlock
    # Badge
    # badge:
    #   label: Hyopocaps
    #   color: text-primary
    #   type: Badge
    elementId: ''
    colors: bg-light-fg-dark
    styles:
      self:
        alignItems: center
        flexDirection: row
        padding:
          - pt-16
          - pl-16
          - pb-16
          - pr-16
  # Presentation sondage
  - type: FeaturedItemsSection
    title:
      text:
      color: text-dark
      styles:
        self:
          textAlign: center
      type: TitleBlock
    items:
      - type: FeaturedItem
        title: 70%
        subtitle: Sur la consommation de sucre
        text: >-
          - Écœurement

          - Accoutumance

          - Addiction

          - <a href="https://www.inicea.fr/articles/nos-articles/les-troubles-du-comportement-alimentaire-TCA" title="Trouble du Comportement Alimentaire" target="_blank" rel="noopener">TCA</a>

          - Caries
        actions: []
        elementId: null
        colors: bg-neutralAlt-fg-dark
        styles:
          self:
            padding:
              - pt-8
              - pl-8
              - pb-8
              - pr-8
            borderRadius: x-large
            flexDirection: row
            justifyContent: center
            textAlign: left
        image:
          type: ImageBlock
          altText: Carrées de sucre
          elementId: ''
          url: /images/logo_SugarCube.png
          styles:
            self:
              borderRadius: x-large
      - title: 85%
        subtitle: des packagings non adaptés
        text: >-
          - Fragiles

          - Encombrants 

          - Cassables

          - Salissant

          - Jetables

        image:
          url: /images/logo_Emballage.png
          altText: Emballage
          elementId: ''
          type: ImageBlock
        actions: []
        colors: bg-neutralAlt-fg-dark
        styles:
          self:
            padding:
              - pt-8
              - pl-8
              - pb-8
              - pr-8
            borderRadius: x-large
            flexDirection: row
            textAlign: left
            justifyContent: center
        type: FeaturedItem
    badge:
      label: Pourcentage des personnes interrogées rencontrant des problèmes concernant leur solution de resucrage
      color: text-primary
      styles:
        self:
          textAlign: center
      type: Badge
    elementId: ''
    variant: three-col-grid
    colors: bg-neutral-fg-dark
    styles:
      self:
        padding:
          - pb-16
          - pt-16
          - pl-16
          - pr-16
        justifyContent: center
      subtitle:
        textAlign: center

  # ---
  - title: Divider
    colors: bg-light-fg-dark
    styles:
      self:
        padding:
          - pt-7
          - pl-7
          - pb-7
          - pr-7
    type: DividerSection

  # Bloc text
  - type: CenterSection
    title:
      # Text principal
      text: 'En plus de ces difficultés, des enjeux sociaux-environnementaux importants apparaissent'
      color: text-dark
      type: TitleBlock
    # Texte
    text: >-
      - Consommation d’eau pour la production (1kg de sucre = 1782 litres d’eau) 

      - Pollution engendrée liée aux différents packaging
    elementId: ''
    colors: bg-light-fg-dark
    styles:
      self:
        alignItems: center
        flexDirection: row
        padding:
          - pt-16
          - pl-16
          - pb-16
          - pr-16

  # ---
  - title: Divider
    colors: bg-light-fg-dark
    styles:
      self:
        padding:
          - pt-7
          - pl-7
          - pb-7
          - pr-7
    type: DividerSection

  # Section video youtube presenation du projet
  - type: GenericSection
    title:
      text: Présentation de notre problème
      color: text-dark
      styles:
        self:
          textAlign: left
      type: TitleBlock
    subtitle: 'Crédit: moovjee'
    text: |-
      Cette vidéo publiée par [moovjee](https://www.youtube.com/@moovjee), où Maë Legardeur est interrogée, explique nos motivations ainsi que la source de notre idée.
    actions: []
    media:
      title: Hypocaps (Nouvelle-Aquitaine)_Maë Legardeur
      url: https://www.youtube.com/watch?v=9toTf5j-wBI
      autoplay: false
      loop: true
      muted: false
      controls: true
      aspectRatio: '16:9'
      styles:
        self:
          padding:
            - pt-2
            - pb-2
            - pl-2
            - pr-2
          borderColor: border-dark
          borderStyle: solid
          borderWidth: 1
          borderRadius: large
      type: VideoBlock
    elementId: null
    colors: bg-light-fg-dark
    styles:
      self:
        flexDirection: row
        justifyContent: center
      subtitle:
        textAlign: left

  # ---
  - title: Divider
    colors: bg-light-fg-dark
    styles:
      self:
        padding:
          - pt-7
          - pl-7
          - pb-7
          - pr-7
    type: DividerSection

  # Témoignages
  - type: CarouselSection
    title: null
    subtitle: Témoignages de soutien pour le projet Hypocaps
    items:
      - content/data/temoignages/temoin1.json
      - content/data/temoignages/temoin2.json
      - content/data/temoignages/temoin3.json
      - content/data/temoignages/temoin4.json
    elementId: null
    variant: next-prev-nav
    colors: bg-light-fg-dark
    styles:
      self:
        justifyContent: center
      subtitle:
        textAlign: center

  # Contact
  - title:
      text: Nous contacter
      color: text-dark
      type: TitleBlock
    subtitle: Une question, une suggestion ? Écrivez-nous !
    text: |-
      Vous avez une question sur le projet Hypocaps, une suggestion, ou vous souhaitez simplement nous donner votre avis ? N'hésitez pas à nous écrire, nous répondons à tous les messages.
    media:
      fields:
        - name: name
          label: Nom
          hideLabel: true
          placeholder: Votre nom
          isRequired: true
          width: full
          type: TextFormControl
        - name: email
          label: Email
          hideLabel: true
          placeholder: Votre adresse email
          isRequired: true
          width: full
          type: EmailFormControl
        - name: message
          label: Message
          hideLabel: true
          placeholder: Votre message
          isRequired: true
          width: full
          type: TextareaFormControl
      elementId: contact-form
      styles:
        self:
          padding:
            - pt-6
            - pb-6
            - pl-6
            - pr-6
          borderColor: border-dark
          borderStyle: solid
          borderWidth: 1
          borderRadius: large
      type: FormBlock
      submitButton:
        type: SubmitButtonFormControl
        label: Envoyer
        showIcon: false
        icon: arrowRight
        iconPosition: right
        style: primary
        elementId: null
    badge:
      label: Contact
      color: text-primary
      type: Badge
    colors: bg-light-fg-dark
    type: GenericSection

# Seo
seo:
  metaTitle: Hypocaps
  metaDescription: This site is built by Arthur Fresse.
  socialImage: /images/logo-dark.svg
  type: Seo
type: PageLayout
---
