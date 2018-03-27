//FONCTION APPELEES GRACE AU XML (ACTIVITY_TEST_DATABASE)
    public void onClick(View view){
        //@SuppressWarnings("unchecked");

        ArrayAdapter<Heros> adapter = (ArrayAdapter<Heros>) getListAdapter();

        Heros myHeros = null;

        switch(view.getId()){
            case R.id.add:
                String[] heros = new String[] {"Adrien",
                        "Lucas",
                        "Pierre",
                        "William"};
                String[] desc = new String[]{
                        "Heros relou",
                        "Héros marrant",
                        "Héros taré",
                        "Héros gentil"
                };
                String[] url = new String[]{
                        "herosRelouUrl.com",
                        "herosMarrantUrl.com",
                        "herosTareUrl.com",
                        "herosGentilUrl.com"
                };
                int nextInt = new Random().nextInt(4);
                //ENREGISTREMENT HEROS BDD

                myHeros = datasource.createHeros(heros[nextInt], desc[nextInt], url[nextInt]);

                adapter.add(myHeros);
                break;

            case R.id.delete:
                if(getListAdapter().getCount()>0){
                    myHeros = (Heros) getListAdapter().getItem(0);
                    datasource.deleteHeros(myHeros);
                    adapter.remove(myHeros);
                }
                break;
            case R.id.vider:
                if(getListAdapter().getCount()>0){
                    int limite = getListAdapter().getCount();

                    for (int i = 0; i<limite;i++){
                        myHeros = (Heros) getListAdapter().getItem(0);
                        datasource.clean(myHeros);
                        adapter.remove(myHeros);
                    }

                    datasource.clean(myHeros);
                }
                break;
            case R.id.afficherBDD:
                if(getListAdapter().getCount()>0){
                    int limite = getListAdapter().getCount();
                    for(int i = 0; i<limite ;i++){
                        System.out.println(adapter.getItem(i).getNom());
                    }
                }
        }
        adapter.notifyDataSetChanged();
    }